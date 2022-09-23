import http from "k6/http";

export default function getToken() {
  const param = {
    grant_type: "password",
    username: `${__ENV.DASHBOARD_AUTH_USERNAME}`,
    password: `${__ENV.DASHBOARD_AUTH_PASSWORD}`,
    audience: "https://dev.api.brikl.com",
    client_id: `${__ENV.CLIENT_ID}`,
    client_secret: `${__ENV.CLIENT_SECRET}`,
  };
  const res = http.post("https://dev.auth.brikl.com/oauth/token", param);
  return `Bearer ${res.json().access_token}`;
}
