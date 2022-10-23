export const rolesDict = {
  Admin: 1,
  Caretaker: 2,
  Veterinarian: 3,
  Volunteeer: 4,
};
export const checkRoles = (allowedRoles, authRoles) => {
  return allowedRoles.some((r) => authRoles.includes(r));
};
