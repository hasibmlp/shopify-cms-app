import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Header/>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

function Header() {

  const active = false

  return (
    <div className="w-full h-[50px] bg-white shadow-sm flex items-center">
      <div className="px-3 border-r border-gray-100 h-full flex items-center">
        <Logo/>
      </div>
      <nav className="px-5 flex items-center">
        <Link to="contentmanagement">
          <HeaderNav>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 8V20H9V8H5ZM3 7L7 2L11 7V22H3V7ZM19 16V14H16V12H19V10H17V8H19V6H15V20H19V18H17V16H19ZM14 4H20C20.5523 4 21 4.44772 21 5V21C21 21.5523 20.5523 22 20 22H14C13.4477 22 13 21.5523 13 21V5C13 4.44772 13.4477 4 14 4Z"></path></svg>
          </HeaderNav>
        </Link>
        <HorizontalDivider/>
        <Link to="contentType">
          <HeaderNav style={{marginRight: 12}}>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001C20 20.5524 19.5523 21.0001 19 21.0001ZM6 19.0001H18V9.15757L12 3.70302L6 9.15757V19.0001ZM8.59117 13.809C8.52937 13.5487 8.49666 13.2771 8.49666 12.9979C8.49666 12.7187 8.52936 12.4472 8.59115 12.1869L7.60001 11.6147L8.59952 9.88345L9.59136 10.4561C9.98427 10.0844 10.4633 9.80285 10.9954 9.64448V8.5001H12.9945V9.64448C13.5266 9.80284 14.0056 10.0844 14.3985 10.456L15.3904 9.88336L16.39 11.6146L15.3987 12.1868C15.4605 12.4471 15.4932 12.7187 15.4932 12.9979C15.4932 13.2771 15.4605 13.5486 15.3988 13.8089L16.39 14.3812L15.3905 16.1124L14.3986 15.5397C14.0057 15.9114 13.5267 16.1929 12.9946 16.3513V17.4957H10.9955V16.3514C10.4634 16.193 9.98437 15.9115 9.59144 15.5398L8.59957 16.1125L7.60001 14.3813L8.59117 13.809ZM11.995 14.4972C12.823 14.4972 13.4942 13.8259 13.4942 12.9979C13.4942 12.1699 12.823 11.4986 11.995 11.4986C11.1669 11.4986 10.4957 12.1699 10.4957 12.9979C10.4957 13.8259 11.1669 14.4972 11.995 14.4972Z"></path></svg>
          </HeaderNav>
        </Link>
        <Link to="mediaLibrary">
          <HeaderNav style={{marginRight: 12}}>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5ZM18 17L14 11L7 17H18Z"></path></svg>
          </HeaderNav>
        </Link>
        <Link to="plugins">
          <HeaderNav>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.0833 10.4998L21.2854 11.2211C21.5221 11.3632 21.5989 11.6703 21.4569 11.9071C21.4146 11.9774 21.3557 12.0363 21.2854 12.0786L11.9999 17.6498L2.71451 12.0786C2.47772 11.9365 2.40093 11.6294 2.54301 11.3926C2.58523 11.3222 2.64413 11.2633 2.71451 11.2211L3.9166 10.4998L11.9999 15.3498L20.0833 10.4998ZM20.0833 15.1998L21.2854 15.9211C21.5221 16.0632 21.5989 16.3703 21.4569 16.6071C21.4146 16.6774 21.3557 16.7363 21.2854 16.7786L12.5144 22.0411C12.1977 22.2311 11.8021 22.2311 11.4854 22.0411L2.71451 16.7786C2.47772 16.6365 2.40093 16.3294 2.54301 16.0926C2.58523 16.0222 2.64413 15.9633 2.71451 15.9211L3.9166 15.1998L11.9999 20.0498L20.0833 15.1998ZM12.5144 1.30852L21.2854 6.57108C21.5221 6.71315 21.5989 7.02028 21.4569 7.25707C21.4146 7.32745 21.3557 7.38635 21.2854 7.42857L11.9999 12.9998L2.71451 7.42857C2.47772 7.2865 2.40093 6.97937 2.54301 6.74258C2.58523 6.6722 2.64413 6.6133 2.71451 6.57108L11.4854 1.30852C11.8021 1.11851 12.1977 1.11851 12.5144 1.30852Z"></path></svg>
          </HeaderNav>
        </Link>
        <HorizontalDivider/>
        <Link to="marketPlace">
          <HeaderNav style={{marginRight: 12}}>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"></path></svg>
          </HeaderNav>
        </Link>
        <Link to="settings">
          <HeaderNav>
            <svg className={`${active && 'fill-blue-500'} w-6 h-6 fill-gray-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM6.00106 6.00008V9.5148L3.51578 12.0001L6.00106 14.4854V18.0001H9.51578L12.0011 20.4854L14.4863 18.0001H18.0011V14.4854L20.4863 12.0001L18.0011 9.5148V6.00008H14.4863L12.0011 3.5148L9.51578 6.00008H6.00106ZM12.0011 16.0001C9.79192 16.0001 8.00106 14.2092 8.00106 12.0001C8.00106 9.79094 9.79192 8.00008 12.0011 8.00008C14.2102 8.00008 16.0011 9.79094 16.0011 12.0001C16.0011 14.2092 14.2102 16.0001 12.0011 16.0001ZM12.0011 14.0001C13.1056 14.0001 14.0011 13.1047 14.0011 12.0001C14.0011 10.8955 13.1056 10.0001 12.0011 10.0001C10.8965 10.0001 10.0011 10.8955 10.0011 12.0001C10.0011 13.1047 10.8965 14.0001 12.0011 14.0001Z"></path></svg>
          </HeaderNav>
        </Link>
      </nav>
    </div>
  )
}

function Logo() {
  return (
      <div className={`h-10 px-3 rounded-[5px] flex items-center justify-center`}>
        <h2 className="text-[18px] text-blue-500 font-bold">Haseeb Group</h2>
      </div>
  )
}

function HeaderNav ({style, children, active,  onMouseIn, onMouseOut}) {

  active = false

  const activeContainer = `bg-blue-100`
  const activeBody = `fill-blue-500`

  return (
      <div onMouseIn={onMouseIn} onMouseDown={onMouseOut} style={style} className={`${active && activeContainer} w-9 h-10 bg-white rounded-[5px] flex items-center justify-center`}>
        {children}
      </div>
  )
}

function HorizontalDivider () {
  return (
    <div className="divider flex h-10 w-[1px] bg-gray-100 mx-5">
    </div>
  )
}
