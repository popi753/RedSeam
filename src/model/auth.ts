const url = "https://api.redseam.redberryinternship.ge/api"

type onRegisterProps = {
  formData: FormData
};

export async function onRegister({ formData }: onRegisterProps) {

  const finalUrl = url + "/register";
  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });
    if (!response.ok) {
      const result = await response.json();
      for (let item of Object.keys(result.errors)) {
        result.errors[item] = result.errors[item][0];
      };
      throw result.errors || { "avatar": "something went wrong" };
    };
    const result = await response.json();
    window.localStorage.setItem("token", result.token);
    window.localStorage.setItem("email", result.user.email);
    window.localStorage.setItem("avatar", result.user.avatar || "");
    return result;
  } catch (error: any) {
    throw (error);
  };
};


type onLoginProps = {
  email: string,
  password: string
};

export async function onLogin({ email, password }: onLoginProps) {
  const finalUrl = url + "/login";
  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const result = await response.json();
      throw result.errors || { "email": result.message, password: result.message } || { "email": "something went wrong" };

    };
    const result = await response.json();
    window.localStorage.setItem("token", result.token);
    window.localStorage.setItem("email", result.user.email);
    window.localStorage.setItem("avatar", result.user.avatar || "");
    return result;
  } catch (error: any) {
    throw (error);
  };
};

