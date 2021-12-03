class ClassTemplate {
  constructor(
    name,
    description,
    duration,
    disclaimer,
    availability,
    allowedLocations,
    price,
    minimumParticipants,
    ageGroup,
    photos,
    video,
    tags
  ) {
    this.name = name
    this.description = description
    this.duration = duration
    this.disclaimer = disclaimer
    this.availability = availability
    this.allowedLocations = allowedLocations
    this.price = price
    this.minimumParticipants = minimumParticipants
    this.ageGroup = ageGroup
    this.photos = photos // string array of links
    this.video = video
    this.tags = tags
  }
  generateNewID() {
    return (
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)
    )
  }
}

const TestClass = new ClassTemplate(
  "Sewing or Something, with an amazing teacher and a long class name to stress test this shit",
  `Lorem ipsum dolor, sit amet consectetur adipisicing elit. <b>Optio excepturi</b> ducimus alias aspernatur consequuntur nostrum dolores culpa illum, fugit ullam quisquam dolor, fugiat iste sunt ea dicta sit nisi vitae aliquam. Voluptate nesciunt fugit illo earum omnis quidem libero repudiandae tempora, quis alias rem laborum minima atque nulla fuga animi quo. Odio ipsam magnam eius veritatis non earum rem similique, quod ipsum accusamus, doloremque exercitationem tempora necessitatibus maxime, esse et ducimus porro culpa optio maiores est. Fuga impedit vitae eaque qui ullam dignissimos corrupti expedita itaque, consequatur minus adipisci iure <h1>accusantium dolor magnam</h1> repellendus incidunt maxime doloremque non? Doloribus facilis aspernatur, velit est assumenda nam commodi nobis saepe perspiciatis nostrum necessitatibus corrupti tempora fugit dolor autem quae, consectetur officiis. Ipsam delectus ratione inventore, eveniet aliquid cum voluptate rem eos sit error distinctio perferendis eaque molestias corrupti aperiam in nemo voluptates ducimus quae doloribus quaerat consequuntur harum quod. Dolore, ex dolorum. Aliquam quas incidunt dolore, ut voluptatem iusto a quibusdam earum voluptatum inventore velit odit optio soluta minus nesciunt nam iste. Optio adipisci autem qui animi, aliquam laudantium ipsa nemo ullam in eius, suscipit minus ipsum consectetur molestiae officia, sed quisquam? Cupiditate nisi distinctio praesentium corporis amet porro eaque exercitationem alias aliquid? Ut ex omnis illo, praesentium quo odio est veniam pariatur, harum consectetur laborum quisquam laboriosam dicta ratione! Eos, culpa est! Ratione, harum itaque voluptate aliquid recusandae optio mollitia inventore earum deleniti maxime quaerat excepturi soluta qui quo, dicta officiis modi assumenda quisquam vitae ex laudantium, eligendi minima! Harum cum voluptas maiores vero voluptates aspernatur molestiae recusandae quae perferendis rem! Vel dolorum omnis error vitae numquam consequuntur ea aliquid modi laudantium! Consequuntur ducimus laborum saepe, voluptate optio amet illo adipisci consectetur mollitia quisquam natus, corrupti ipsa omnis esse delectus voluptates quas laudantium. Ea temporibus adipisci sint ducimus ratione ipsum hic!`,
  {
    string: "2 hours",
    num: 2,
  },
  "You may have TOO much fun",
  {
    virtual: true,
    virtualNoKit: true,
    inPerson: true,
  },
  {
    virtualOnly: false,
    boutique: true,
    montclairWomanClub: true,
    customVenue: true,
  },
  {
    hasOnePrice: false,
    singlePrice: "$45 per family",
    priceForSearchFunction: 45,
    multiplePrices: {
      virtual: {
        available: true,
        price: "$35 per person",
      },
      virtualNoKit: {
        available: true,
        price: "$25 per person",
      },
      inPerson: {
        available: true,
        price: "$65 per person",
      },
    },
  },
  {
    hasMinimum: true,
    minimum: 5,
  },
  {
    adult: true,
    child: true,
    mixed: true,
  },
  [
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
  {
    hasVideo: true,
    link: "https://www.youtube.com/embed/aPUVUrS2oC0",
  },
  ["children", "adult", "soapmaking", "reiki"]
)
