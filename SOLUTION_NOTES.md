# Solution Notes — OnferenceTV Marketing Campaign Builder

## 1. Why did you choose your technology stack?

- **Frontend — React (Vite) + Tailwind CSS**: Vite gives a fast dev server and quick builds. React's component-based architecture made it easy to keep modules like Login, Dashboard, Campaigns, and Journey Builder separate and reusable. Tailwind allowed me to build a consistent design system quickly without maintaining separate CSS files.
- **Backend — Node.js + Express**: Using the same language (JavaScript) across frontend and backend reduced context-switching and sped up development. Express is lightweight and sufficient for a REST API at this scale — a heavier framework wasn't necessary.
- **Database — MongoDB (Mongoose)**: Campaign and Journey fields can evolve (e.g. new fields for bonus features), so a schema-flexible NoSQL database made sense. Mongoose still gives schema validation and a clean model structure on top of that flexibility.
- **AI — Google Gemini**: Good output quality on the free tier, with a Node SDK (`@google/generative-ai`) that was straightforward to integrate.
- **Auth — JWT + bcrypt**: Simple, stateless authentication — no session store needed, which also simplified deployment.

## 2. How did AI help you during development?

To be honest, I used Claude (Anthropic) throughout development, in a hands-on, AI-assisted way:

- **Boilerplate code**: Generated the initial structure for components like the Login form, Settings page, CampaignTable, and ToastContext, then customized them to fit my requirements.
- **Feature iteration**: For example, I initially used the browser's native `window.confirm()` for delete actions — this wasn't good UX, so I iterated with AI's help, first to a toast-based confirmation, then (after sharing a screenshot of the desired UI) to a proper `ConfirmDialog` modal pattern, kept consistent with the one used in Journey Builder.
- **Debugging**: During Render deployment, I hit several errors (`Cannot find module '@google/generative-ai'`, `Root directory does not exist`, MongoDB IP whitelist failures) — I pasted the actual error logs to AI and worked through root cause and fix for each.
- **Deployment guidance**: MongoDB Atlas setup, Render/Vercel deployment steps, and environment variable structuring were done with AI as a step-by-step guide, since I had limited prior deployment experience.
- **Documentation**: This README and Solution Notes document were also drafted with AI's help.

**What I modified or rejected**: I adjusted UI details (colors, spacing) to match my own design preferences rather than accepting AI's defaults as-is. I also rejected some suggestions — e.g. pulling in a separate confirmation dialog library — because a small custom solution consistent with the existing `ToastContext` was simpler and lighter for this scope.

## 3. Three edge cases considered

1. **Empty / invalid campaign fields**: If required fields like Campaign Name or Email Content are empty, the form doesn't submit — a validation error toast is shown instead.
2. **AI API failure**: If the Gemini API is down or the key is invalid, an error toast is shown on the generate action, and the user can still fill in the fields manually — the flow isn't blocked.
3. **Unauthorized access (expired/invalid token)**: If any API call returns a 401, the frontend automatically clears the stored token and redirects to `/login`, so a stale session doesn't leave the app in a broken state.

*(Also considered: duplicate campaign names are currently allowed silently — this is a known limitation I'd address with a uniqueness check given more time.)*

## 4. With 3 more days, what would you build next?

1. **Duplicate campaign name / CTA URL validation** — there's currently no uniqueness check on the backend; adding this would improve data quality.
2. **Campaign Analytics Dashboard** — tracking basic metrics like open rate and click rate, visualized on the dashboard, so the marketing team can see actual campaign performance.
3. **Email Scheduling** — campaigns are currently just Draft/Published; letting users schedule a specific send date/time would be a natural next step.
4. **Journey History / Logs** — tracking which journey triggered for which user and what step they're at, for visibility into automation behavior.
5. **Campaign Templates** — reusable formats for commonly-used email structures, so new campaigns can be created faster.

I prioritized these because they'd deliver the most day-to-day value to a marketing team using this tool, rather than just increasing the feature count.