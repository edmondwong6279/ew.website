/**
 * Global loading components that wraps the main body,
 * but is outside the nav bar and footer
 */
export default function Loading({ children }: { children: React.ReactNode }) {
  return (
    <h2>
      LOADING
      {/* TODO do we need to render the chilrden here? */}
      {/* {children} */}
    </h2>
  );
}
