const url = "https://api.redseam.redberryinternship.ge/api"

export type product = {
  id: number,
  name: string,
  cover_image: string,
  price: number,
}

export type meta = {
  current_page: number,
  from: number,
  last_page: number,
  path: string,
  per_page: number,
  to: number,
  total: number
}

export type result = {
  products: product[],
  meta: meta
}

type onFetchProductsProps = {
  page: string,
  from?: string,
  to?: string,
  sort?: string,
}

export async function onFetchProducts({ page, from, to, sort }: onFetchProductsProps): Promise<result | Error> {

  const finalurl = url + "/products"
    + (page ? "?page=" + page : "")
    + (from ? (page ? "&" : "?") + "filter[price_from]=" + from : "")
    + (to ? ((page || from) ? "&" : "?") + "filter[price_to]=" + to : "")
    + (sort ? ((page || from || to) ? "&" : "?") + "sort=" + sort : "");

  try {
    const response = await fetch(finalurl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });
    console.log(response.ok);
    if (!response.ok) {
      throw "something went wrong";
    };
    const result = await response.json();

    const obj = {
      products: result.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          cover_image: item.cover_image,
          price: item.price,
        };
      }),
      meta: result.meta,
    }
    return obj;
  } catch (error: any) {
    throw new Error((error));
  }
};

type onFetchProductProps = {
  id: string
}


export type productObj = {
  id: number,
  name: string,
  description: string,
  release_year: string,
  cover_image: string,
  images: string[],
  price: number,
  available_colors: string[],
  available_sizes: string[],
  brand: {
    id: number,
    name: string,
    image: string
  },
  total_price: number,
  quantity: number,
  color: string,
  size: string
}
 



export async function onFetchProduct({id}:onFetchProductProps): Promise<productObj | Error> {

  const finalurl = url + "/products/" + id;

  try {
    const response = await fetch(finalurl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });
    console.log(response.ok);
    if (!response.ok) {
      throw "something went wrong";
    };
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error((error));
  }
}



