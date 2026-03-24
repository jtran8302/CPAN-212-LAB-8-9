// In-memory blacklist (resets on server restart)
const blacklistedTokens = new Set();

export const tokenBlacklist = {
    add(token) {
        blacklistedTokens.add(token);
    },

    has(token) {
        return blacklistedTokens.has(token);
    }
};