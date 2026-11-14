import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// In-memory submissions log for real persistence across requests
interface ServerSubmissionItem {
  id: string;
  lessonPath: string;
  title: string;
  mode: string;
  score: number;
  rawScore: number;
  correctCount: number;
  totalQuestions: number;
  timeSpent: string;
  submittedAt: string;
  receivedAt: string;
}

const inMemorySubmissions: ServerSubmissionItem[] = [];

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // 1. API endpoint for storing and retrieving student submissions & scores
    if (url.pathname === "/api/submissions") {
      const headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });

      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers });
      }

      if (request.method === "POST") {
        try {
          const body = (await request.json()) as Partial<ServerSubmissionItem>;
          const submissionItem: ServerSubmissionItem = {
            id: `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            lessonPath: body.lessonPath || "",
            title: body.title || "Bài kiểm tra Vật lý",
            mode: body.mode || "thi",
            score: typeof body.score === "number" ? body.score : 0,
            rawScore: typeof body.rawScore === "number" ? body.rawScore : 0,
            correctCount: typeof body.correctCount === "number" ? body.correctCount : 0,
            totalQuestions: typeof body.totalQuestions === "number" ? body.totalQuestions : 0,
            timeSpent: body.timeSpent || "00:00",
            submittedAt: body.submittedAt || new Date().toISOString(),
            receivedAt: new Date().toISOString(),
          };

          inMemorySubmissions.unshift(submissionItem);
          if (inMemorySubmissions.length > 200) {
            inMemorySubmissions.pop();
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: "Bài làm đã được chấm điểm và lưu vào hệ thống TamGiangPhysics thành công.",
              submissionId: submissionItem.id,
              data: submissionItem,
            }),
            { status: 200, headers },
          );
        } catch (err) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Lỗi định dạng dữ liệu bài nộp",
              error: String(err),
            }),
            { status: 400, headers },
          );
        }
      }

      // GET: return list of submissions
      const lessonQuery = url.searchParams.get("lesson");
      const filtered = lessonQuery
        ? inMemorySubmissions.filter((item) => item.lessonPath.includes(lessonQuery))
        : inMemorySubmissions;

      return new Response(
        JSON.stringify({
          success: true,
          count: filtered.length,
          submissions: filtered,
        }),
        { status: 200, headers },
      );
    }

    // 2. Seamless proxy and rebranding for interactive physics simulations from vatly.ai
    if (url.pathname.startsWith("/api/mo-phong/")) {
      const targetUrl = "https://vatly.ai" + url.pathname + url.search;
      try {
        const upstream = await fetch(targetUrl, {
          method: request.method,
          headers: {
            "User-Agent": request.headers.get("User-Agent") || "Mozilla/5.0",
            Accept: request.headers.get("Accept") || "*/*",
          },
        });

        const headers = new Headers(upstream.headers);
        headers.set("Access-Control-Allow-Origin", "*");
        // Keep simulation running cleanly without third-party iframe frame-ancestor blocks
        headers.delete("X-Frame-Options");
        headers.delete("Content-Security-Policy");

        const contentType = upstream.headers.get("content-type") || "";

        // If not HTML (e.g. css, js, svg, mp3), pass through stream directly
        if (!contentType.includes("text/html")) {
          return new Response(upstream.body, {
            status: upstream.status,
            headers,
          });
        }

        // Rebrand HTML and inject submission bridge & confirm modal polyfill
        let html = await upstream.text();

        // 2a. Rebrand header logo with official TamGiang school emblem
        html = html.replace(
          /<span class="logo"><img alt="[^"]*" src="data:image\/svg\+xml;base64,[^"]*"><\/span>/gi,
          `<span class="logo" style="background:transparent;display:flex;align-items:center;justify-content:center"><img alt="Logo TamGiangPhysics" src="/logo-tamgiang.png" style="width:48px;height:48px;border-radius:50%;object-fit:cover;box-shadow:0 0 10px rgba(54,217,232,0.5)"></span>`,
        );

        // 2b. Rebrand slogan
        html = html.replace(
          /<p class="slogan">[^<]*<\/p>/gi,
          `<p class="slogan" style="color:#36D9E8;font-weight:700">TamGiangPhysics — Khám phá khoa học thực nghiệm</p>`,
        );

        // 2c. Rebrand footer
        html = html.replace(
          /<footer class="foot"><b>[^<]*<\/b><span>[^<]*<\/span><\/footer>/gi,
          `<footer class="foot"><b>TamGiangPhysics — Nền tảng học tập & Khảo sát Vật lý số</b><span>Email: nguyenquan862011@gmail.com · © 2026 Trần Đình Nguyên Quân</span></footer>`,
        );

        // 2d. Clean up any remaining legacy branding text
        html = html.replace(/Vật Lý Siêu Nhẩm/g, "TamGiangPhysics");
        html = html.replace(/VậtLý\.ai/g, "TamGiangPhysics");

        // 2e. Inject script bridge: safe confirm dialog, submission interceptor, postMessage, & server persistence
        const bridgeScript = `
<script id="tamgiang-submission-bridge">
(function() {
  // 1. Safe confirm polyfill so sandboxed iframes without native modal dialogs don't block submission
  var _origConfirm = window.confirm;
  window.confirm = function(msg) {
    try {
      if (typeof _origConfirm === 'function') {
        var res = _origConfirm(msg);
        if (typeof res === 'boolean') return res;
      }
    } catch(e) {
      console.warn('[TamGiang] Sandboxed confirm intercepted, auto-confirming:', e);
    }
    return true;
  };

  // 2. Submission Listener and Bridge
  function attachTamGiangBridge() {
    var submitB = document.getElementById('submitB');
    if (!submitB || submitB.__tgHooked) return;
    submitB.__tgHooked = true;

    var prevOnClick = submitB.onclick;
    submitB.onclick = function(e) {
      var isSubmitting = submitB.getAttribute('data-submitting') === 'true';
      if (isSubmitting) return;

      submitB.setAttribute('data-submitting', 'true');
      var originalText = submitB.textContent;
      submitB.textContent = 'Đang nộp bài...';

      try {
        if (typeof prevOnClick === 'function') {
          prevOnClick.call(submitB, e);
        }
      } catch (err) {
        console.error('[TamGiang] Error in original submission handler:', err);
      }

      setTimeout(function() {
        submitB.removeAttribute('data-submitting');
        submitB.textContent = originalText;

        try {
          if (typeof scoreNow === 'function' && typeof S !== 'undefined') {
            var r = scoreNow();
            var timeStr = (typeof clock === 'function') ? clock() : '00:00';
            var p1Len = (typeof P1 !== 'undefined' && Array.isArray(P1)) ? P1.length : 0;
            var p2Len = (typeof P2 !== 'undefined' && Array.isArray(P2)) ? P2.reduce(function(acc, q){ return acc + (q.it ? q.it.length : 0); }, 0) : 0;
            var p3Len = (typeof P3 !== 'undefined' && Array.isArray(P3)) ? P3.length : 0;
            var totalQ = p1Len + (typeof P2 !== 'undefined' ? P2.length : 0) + p3Len;

            var payload = {
              lessonPath: window.location.pathname.replace(/^\\/api\\/mo-phong\\/?/, ''),
              title: document.title || 'Bài tập Vật lý',
              mode: S.mode || 'thi',
              score: r ? r.ten : 0,
              rawScore: r ? r.raw : 0,
              correctCount: r ? (r.c1 + r.c2 + r.c3) : 0,
              totalQuestions: totalQ,
              p1: r ? { correct: r.c1, total: p1Len } : null,
              p2: r ? { correct: r.c2, total: p2Len } : null,
              p3: r ? { correct: r.c3, total: p3Len } : null,
              timeSpent: timeStr,
              submittedAt: new Date().toISOString()
            };

            // Post to parent window for react viewer modal & local persistence
            if (window.parent && window.parent !== window) {
              window.parent.postMessage({
                type: 'TAMGIANG_SUBMISSION_RESULT',
                payload: payload
              }, '*');
            }

            // Post to server storage API
            fetch('/api/submissions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }).catch(function(err) {
              console.warn('[TamGiang] Could not post to /api/submissions:', err);
            });
          }
        } catch(ex) {
          console.error('[TamGiang] Error calculating submission data:', ex);
        }
      }, 150);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachTamGiangBridge);
  } else {
    attachTamGiangBridge();
  }
  setInterval(attachTamGiangBridge, 1000);
})();
</script>
`;

        if (html.includes("</head>")) {
          html = html.replace("</head>", bridgeScript + "</head>");
        } else if (html.includes("</body>")) {
          html = html.replace("</body>", bridgeScript + "</body>");
        } else {
          html += bridgeScript;
        }

        return new Response(html, {
          status: 200,
          headers,
        });
      } catch (err) {
        console.error("Simulation proxy error for", targetUrl, err);
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
