# Join form → Google Sheet

Website ka Join form har entry is Google Sheet me save karta hai, aur saath me WhatsApp bhi kholta hai.

## Ek baar ka setup (5 minute)

1. **sheets.new** kholo (club ke Google account se). Naam rakho: `36RC Members`.
2. Menu me **Extensions → Apps Script** kholo.
3. Wahan jo code hai use hata do, aur is folder ki `Code.gs` file ka poora code paste karo. **Save** (Ctrl+S) dabao.
4. Upar right me **Deploy → New deployment** dabao.
   - Gear icon se type chuno: **Web app**
   - Description: `36RC form`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** dabao.
5. Google permission maangega: **Authorize access** → apna account → **Advanced → Go to project (unsafe)** → **Allow**. (Ye aapki apni script hai, isliye "unsafe" warning normal hai.)
6. Ek **Web app URL** milega, jo `https://script.google.com/macros/s/…/exec` jaisa dikhta hai. Use copy karo.
7. Wo URL `src/config.js` me `sheetUrl` me daal do (ya developer ko bhej do).

## Check karna

- Web app URL browser me kholo. `{"ok":true,...}` dikhe to script chal rahi hai.
- Website pe form bharke bhejo. Sheet me **Members** tab me nayi line aa jayegi.

## Script badalni ho to

Code badalne ke baad **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** dabao. URL wahi rahega.
