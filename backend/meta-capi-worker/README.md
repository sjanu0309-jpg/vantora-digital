# Meta Conversions API relay (Cloudflare Worker)

The website already sends every **PageView** and **Lead** to the Meta Pixel with an `eventID`.
This free Cloudflare Worker sends the same events server-side (Conversions API) with the
same ID, so Meta counts each event once and recovers events blocked by ad-blockers / iOS.

The access token stays inside Cloudflare — it is never in the website code.

## 1. Get the access token (Meta)
1. Events Manager → select dataset **1438216061823650** → **Settings**.
2. Under *Conversions API* → **Generate access token**. Copy it.

## 2. Create the Worker (Cloudflare, free plan)
1. Sign up at dash.cloudflare.com → **Workers & Pages → Create → Create Worker**.
2. Name it `vantora-capi` → **Deploy** → **Edit code**.
3. Replace everything with the contents of `worker.js` in this folder → **Deploy**.
4. Worker → **Settings → Variables and Secrets** → add:

   | Name | Type | Value |
   |---|---|---|
   | `PIXEL_ID` | Text | `1438216061823650` |
   | `META_ACCESS_TOKEN` | **Secret** | token from step 1 |
   | `ALLOWED_ORIGINS` | Text | `https://vantoradigital.info,https://www.vantoradigital.info` |
   | `TEST_EVENT_CODE` | Text | *(optional, only while testing — copy from Events Manager → Test events)* |

5. Copy the Worker URL, e.g. `https://vantora-capi.<your-subdomain>.workers.dev`.

## 3. Connect it to the website (GitHub)
Repo **Settings → Secrets and variables → Actions → Variables → New repository variable**:
`VITE_META_CAPI_URL` = the Worker URL. Then **Actions → Deploy website to GitHub Pages → Run workflow**.

## 4. Test
1. Events Manager → **Test events** → copy the test code → put it in `TEST_EVENT_CODE`.
2. Open https://vantoradigital.info — you should see **PageView** twice: *Browser* and *Server*,
   marked **Deduplicated**. Submit a test enquiry → **Lead** appears the same way.
3. Delete `TEST_EVENT_CODE` when done.
