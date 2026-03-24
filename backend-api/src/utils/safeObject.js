export function stripSensitiveUserFields(user) {
  if (!user) return null;

  const plainObject =
    typeof user.toObject === "function"
      ? user.toObject()
      : JSON.parse(JSON.stringify(user));

  delete plainObject.passwordHash;
  delete plainObject.__v;

  return plainObject;
}

export function stripSensitiveUsers(users = []) {
  return users.map(stripSensitiveUserFields);
}

export function omitFields(source, fields = []) {
  if (!source || typeof source !== "object") return source;

  const target =
    typeof source.toObject === "function"
      ? source.toObject()
      : JSON.parse(JSON.stringify(source));

  for (const field of fields) {
    delete target[field];
  }

  return target;
}