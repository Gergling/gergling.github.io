import { useEffect } from "react";

export const useLog = (...args: Parameters<typeof console.log>) => useEffect(() => console.log(...args), args);
