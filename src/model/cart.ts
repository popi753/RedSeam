const url = "https://api.redseam.redberryinternship.ge/api"


type cartProps = {
    token : string,
    id? : number
    data? : {
      quantity: number,
      color: string,
      size: string
    }
}


export type productObj = {
  id: number,
  name: string,
  cover_image: string,
  color: string,
  size: string
  price: number,
  quantity: number,
}

export async function onFetchCart({token}:cartProps): Promise<productObj[] | Error> {
  const finalurl = url + "/cart";

  try {
    const response = await fetch(finalurl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw "something went wrong";
    };
    const result = await response.json();
    const res = result.map(((item : any) =>{
      return{
              id: item.id,
              name: item.name,
              cover_image: item.images[item.available_colors.indexOf(item.color)] || item.cover_image,
              color: item.color,
              size: item.size,
              price: item.price,
              quantity: item.quantity
            };
        
    }));
    return res;
  } catch (error: any) {
    throw new Error((error));
  }
}



export async function onPostCart({token, id,data}:cartProps): Promise<void | Error> {
  const finalurl = url + "/cart/products/" + id;
  try {
    const response = await fetch(finalurl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
          const result = await response.json(); 
            for(let item of Object.keys(result.errors)){
    result.errors[item] = result.errors[item][0];
};
            throw result.errors || {"color": "something went wrong"};
    };
  } catch (error: any) {
    throw (error);
  }
}




export async function onDeleteCart({token, id, data}:cartProps): Promise<void | Error> {

  const finalurl = url + "/cart/products/" + id;
  try {
    const response = await fetch(finalurl, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
          const result = await response.json(); 
          throw result.message || "something went wrong";
    };

  } catch (error: any) {
    throw (error);
  }
}


export async function onUpdateCart({token, id, data}:cartProps): Promise<void | Error> {

  const finalurl = url + "/cart/products/" + id;
  try {
    const response = await fetch(finalurl, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
          const result = await response.json(); 
          throw result.message || "something went wrong";
    };

  } catch (error: any) {
    throw (error);
  }
}

type checkoutProps = {
  token : string;
  data : {
      name : string;
      surname : string;
      email : string;
      address : string;
      zip_code : string;
  }

}



export async function onCheckout({token,data}:checkoutProps): Promise<void | Error> {
  const finalurl = url + "/cart/checkout";
  try {
    const response = await fetch(finalurl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
            const result = await response.json(); 
            for(let item of Object.keys(result.errors)){
                  result.errors[item] = result.errors[item][0];
            };
            throw result.errors || {"name": "something went wrong"};
    };
    // const result = await response.json();
  } catch (error: any) {
    throw (error);
  }
}
