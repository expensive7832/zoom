

interface linksProps {
  id: number,
  title: string,
  url: string,
  img: string
}


const links: linksProps[] = [
  {
    id:1, 
    title: "Home",
    url:"/",
    img: require("@/public/home.png")
  },
  {
    id:2, 
    title: "Upcoming",
    url:"/upcoming",
    img: require("@/public/upcoing.png")
  },
  {
    id:3, 
    title: "Previous",
    url:"/previous",
    img: require("@/public/upcoing.png")
  },
  {
    id:4, 
    title: "Recordings",
    url:"/recording",
    img: require("@/public/Video.png")
  },
  {
    id:5, 
    title: "Personal",
    url:"/personal",
    img: require("@/public/Vector.png")
  },


]


export default links