import jwt from "jsonwebtoken";

export const makeDoAuthMiddleware = (validTokenType = "access") => {
	const doAuthMiddleware = async (req, res, next) => {
		const __unauthorized = () => {
			res.status(401).json({
				message: "401 unauthorized. Please login first.",
			});
		};

		try {
			const token = extractTokenFromRequest(req, validTokenType);
			if (!token) return __unauthorized();

			const userClaims = jwt.verify(token, process.env.JWT_SECRET, {
				algorithms: ["HS256"],
			});

			if (userClaims.tokenType !== validTokenType)
				return __unauthorized();
			req.userClaims = userClaims;
			next();
		} catch (err) {
			return __unauthorized();
		}
	};
	return doAuthMiddleware;
};

const extractTokenFromRequest = (req, tokenType) => {
	let tokenInfo;
	if (tokenType === "refresh" && req.session.refreshToken) {
		tokenInfo = req.session?.refreshToken;
		return tokenInfo;
	} else {
		tokenInfo = req.headers.token;
	}
	if (!tokenInfo) {
		throw new Error("No Token info available");
	}

	const [tokenStrategy, token] = tokenInfo.split(" ");
	if (tokenStrategy !== "JWT" || !token) {
		throw new Error("Invalid token strategy or no token provided");
	}

	return token;
};
