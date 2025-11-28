export const getLargestPrimeFactor = (n: number) => {
  let i=2;
  while (i<=n){
    if (n%i == 0){
      n/=i;    
    }else{
      i++;
    }
  }
  return i;
};

export const interpolate = (
  input: number,
  inputMinimum: number,
  inputMaximum: number,
  outputMinimum: number,
  outputMaximum: number
): number => {
  if (input <= inputMinimum) return outputMinimum;
  if (input >= inputMaximum) return outputMaximum;

  const inputRange = inputMaximum - inputMinimum;
  const inputScaled = input / inputRange;
  const outputRange = outputMaximum - outputMinimum;
  const outputScaled = inputScaled * outputRange;
  const interpolated = outputMinimum + outputScaled;
  return interpolated;
};
