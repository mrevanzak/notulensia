let baseUrl = "https://agenda.saranaintegrasi.co.id";
if(process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3000";
}

const authLink = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount";
const client_id = "898862951743-ort2u42i3kgdfuhsf9jn1ffi9a39embv.apps.googleusercontent.com";

export const getAccessToken = ({redirect_uri, scope}: {redirect_uri:string, scope:string}) => {
      const queryParams = {
        client_id: client_id,
        redirect_uri: `${baseUrl}${redirect_uri}`,
        scope: scope,
        prompt: "select_account",
        response_type: "token",
        include_granted_scopes: true,
        enable_granular_consent: true,
      };
      const queryString = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              queryParams[key],
            )}`,
        )
        .join("&");

      const url = `${authLink}?${queryString}`;
      const newWindow = window.open(url, "_blank");

      if (newWindow) {
        newWindow.focus();
      }
}