/** Shared <main> wrapper used by every marketplace screen. */
export default function Page({ children, className = '' }) {
  return <main id="main-content" className={`page-view marketplace ${className}`}>{children}</main>;
}
