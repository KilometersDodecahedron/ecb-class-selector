const classData = [
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 1",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 2",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 3",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 4",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 5",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 6",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 7",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 8",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 9",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 10",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 11",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 12",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 13",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 14",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 15",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 16",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 17",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 18",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 19",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 20",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 21",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 22",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 23",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 24",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 25",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 26",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 27",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 28",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 29",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 30",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 31",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 32",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 33",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 34",
  },
  {
    imgSrc: "https://picsum.photos/200/200",
    name: "Class 35",
  },
]

const returnClassData = () => {
  return classData
}

const testTagData = {
  name: "Painting",
}

const testStructuredData = {
  name: "Test Class",
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
consequuntur! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
quasi aliquam eligendi, placeat qui corporis!`,
  duration: {
    string: "2 to 3 hours",
    num: 2,
  },
  disclaimer: "This is a test entry, not an actual class",
  availability: {
    virtual: true,
    virtualNoKit: false,
    inPerson: false,
  },
  allowedLocations: {
    virtualOnly: true,
    boutique: false,
    montclairWomanClub: false,
    customVenue: false,
  },
  price: {
    hasOnePrice: true,
    singlePrice: "$50 per Person",
    priceForSearchFunction: 50,
    multiplePrices: {
      virtual: {
        available: true,
        price: "None",
      },
      virtualNoKit: {
        available: false,
        price: "None",
      },
      inPerson: {
        available: false,
        price: "None",
      },
    },
  },
  minimumParticipants: {
    hasMinimum: true,
    minimum: 4,
  },
  ageGroup: {
    adult: true,
    child: true,
    mixed: true,
  },
  photos: [
    {
      src: "https://picsum.photos/id/1/800/800",
      alt: "laptop and man",
    },
    {
      src: "https://picsum.photos/id/1003/800/800",
      alt: "Deer in woods",
    },
    {
      src: "https://picsum.photos/id/102/800/800",
      alt: "Raspberries",
    },
    {
      src: "https://picsum.photos/id/1025/800/800",
      alt: "Pug in blanket",
    },
  ],
  tags: ["Good For Groups", "Safe for Kids", "All Ages"],
}
