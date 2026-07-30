import './companies.css';

/**
 * Companies ("الشركات") page — presentation generator tool.
 *
 * This tool is a standalone vanilla HTML/CSS/JS app (its own DOM ids,
 * globals, and CDN scripts like PptxGenJS and Google Fonts). Rather
 * than porting it line-by-line into React — which would risk id
 * collisions with the rest of the dashboard and require rewriting all
 * of its DOM logic — it's served as-is from /public/companies-app and
 * embedded here in an iframe so it keeps working exactly as built.
 */
export function CompaniesPage() {
  return (
    <div className="companies-page">
      <iframe
        title="مولّد العروض التقديمية - الشركات"
        src="/companies-app/index.html"
        className="companies-page__frame"
      />
    </div>
  );
}
