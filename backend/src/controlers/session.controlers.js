const { get } = require("lodash");
const {
  createSession,
  createAccessToken,
  updateSession,
  findSession,
} = require("../services/session.services");
const { validatePassword } = require("../services/user.service");
const { jwtSign } = require("../utils/utils.jwt");

const createUserSessionHandler = async (req, res) => {
  const user = await validatePassword(req.body);
  console.log(user)
  if (!user) {
    return res.status(401).json({ error: "Invalid Info" });
  }
  const session = await createSession(user._id, req.get("user-agent") || false);
  const accessToken = createAccessToken({
    user,
    session
  });

  const refreshToken = jwtSign(session);
  return res.status(200).send({ accessToken, refreshToken, user });
};

const logoutUserSessionHandler = async (req, res) => {
  try {
    const session_id = get(req, "user.session");
    await updateSession({ session: session_id }, { isValid: false });
    return res.status(200).json({ message: "You are logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const findUserSessionHandler = async (req, res) => {
  try {
    const userId = get(req, "user._id");
    const session = findSession({ user: userId, isValid: true });
    return res.status(200).send(session);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUserSessionHandler,
  findUserSessionHandler,
  logoutUserSessionHandler,
};
