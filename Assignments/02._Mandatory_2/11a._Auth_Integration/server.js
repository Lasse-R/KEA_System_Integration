import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Step 1: Redirect user to GitHub OAuth
app.get('/auth/github', (req, res) => {
  const redirect_uri = 'http://localhost:3000/auth/github/callback';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read:user user:email`;

  res.redirect(githubAuthUrl);
});

// Step 2: GitHub redirects back to your app
app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return res.status(400).send(`Error: ${tokenData.error_description}`);
  }

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/json',
    },
  });

  const userData = await userRes.json();

  res.send(`
    <h1>GitHub Login Successful</h1>
    <p>Username: ${userData.login}</p>
    <img src="${userData.avatar_url}" width="100" />
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
