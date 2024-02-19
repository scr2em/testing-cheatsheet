export function logAfterXMinutes(statement: string, minutes: number) {
  setTimeout(
    () => {
      console.log(statement);
    },
    minutes * 60 * 1000,
  );
}
