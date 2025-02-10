"use server";

export async function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  return currentYear;
}