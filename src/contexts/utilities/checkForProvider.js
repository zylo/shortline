/* every context should return a defined value if used inside the appropriate context provider;
   however, context values can initially be undefined until the URL has been parsed for query params
   that set the initial context value. debounce checkForProvider if you need time for the URL parsing.
*/

export default function checkForProvider(context, contextHookName, contextProviderName) {
  if (context === undefined) {
    throw new Error(`${contextHookName} must be used within a ${contextProviderName}`);
  }
}
