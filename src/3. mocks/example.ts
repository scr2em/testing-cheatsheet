const businessHours = [9, 17];

export function purchase() {
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close) {
    return { message: "Success" };
  }

  return { message: "Error" };
}

/*
export function purchase(currentHour: number) {
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close) {
    return { message: "Success" };
  }

  return { message: "Error" };
}

purchase(new Date().getHours())
 */
