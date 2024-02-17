export function objectToQueryString(
  obj: Record<string, any>,
  snakeCase: boolean = false
) {
  const queryString = Object.keys(obj)
    .map((key) =>
      obj[key]
        ? `${encodeURIComponent(
            snakeCase ? toSnakeCase(key) : key
          )}=${encodeURIComponent(obj[key])}`
        : ""
    )
    .filter((item) => item)
    .join("&");

  return queryString;
}

export function toSnakeCase(word: string): string {
  let snakedCaseWord = word[0].toLowerCase();

  for (let i = 1; i < word.length; i++) {
    const currentChar = word[i];

    if (currentChar === currentChar.toUpperCase()) {
      snakedCaseWord += `_${currentChar.toLowerCase()}`;
    } else {
      snakedCaseWord += currentChar;
    }
  }

  return snakedCaseWord;
}

type DateIncrements = {
  day?: number;
  month?: number;
  year?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
};

export function formatDate(
  dateString: string,
  {
    day = 0,
    month = 0,
    year = 0,
    seconds = 0,
    minutes = 0,
    hours = 0,
  }: DateIncrements = {}
) {
  let currentDate: Date;

  if (dateString) {
    currentDate = new Date(dateString);
  } else {
    currentDate = new Date();
  }

  currentDate.setDate(currentDate.getDate() + day);
  currentDate.setMonth(currentDate.getMonth() + month);
  currentDate.setFullYear(currentDate.getFullYear() + year);
  currentDate.setSeconds(currentDate.getSeconds() + seconds);
  currentDate.setMinutes(currentDate.getMinutes() + minutes);
  currentDate.setHours(currentDate.getHours() + hours);

  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentDate);

  return formattedDateTime.replace(/,/g, "");
}
