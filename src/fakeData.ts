const participants = [
  {
    id: "01df4780-7deb-4dd4-987b-422d9986ec3b",
    name: "Java",
    username: "java",
    avatar: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    eliminated: false,
  },
  {
    id: "3f00b53e-1958-4f83-9a48-8d89f4240885",
    name: "JavaScript",
    username: "javascript",
    avatar:
      "https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png",
    eliminated: false,
  },
  {
    id: "5976aec7-7aff-478a-adda-d0fd47efe633",
    name: "Python",
    username: "python",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
    eliminated: false,
  },
  {
    id: "e3700f99-e9bd-4ce4-8787-be288f456530",
    name: "PHP",
    username: "php",
    avatar: "https://www.php.net/images/logos/new-php-logo.svg",
    eliminated: false,
  },
  {
    id: "dd2c8284-5d2b-4f12-8ee4-6077136d1f84",
    name: "Ruby",
    username: "ruby",
    avatar:
      "https://openwhisk.apache.org/images/runtimes/icon-ruby-text-color-horz.png",
    eliminated: false,
  },
  {
    id: "8943d4aa-4da3-4923-8ab0-bf62f9bca94c",
    name: "Figma",
    username: "figma",
    avatar: "https://ag.digital/wp-content/uploads/2019/08/Group-5.png",
    eliminated: false,
  },
  {
    id: "4c27e17c-d5fd-4a99-ab84-7ccc8a774628",
    name: "Adobe XD",
    username: "adobe-xd",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/2101px-Adobe_XD_CC_icon.svg.png",
    eliminated: false,
  },
];

const gameData = {
  id: "e5348c9e-63a2-480f-87f3-b106b05189be",
  isActive: true,
  createdAt: "2023-03-08T17:25:33.531Z",
  gameParticipants: [
    {
      participant: {
        id: "01df4780-7deb-4dd4-987b-422d9986ec3b",
        name: "Java",
        username: "java",
        avatar: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
        eliminated: true,
      },
      votes: 0,
      percent: 33,
    },
    {
      participant: {
        id: "3f00b53e-1958-4f83-9a48-8d89f4240885",
        name: "JavaScript",
        username: "javascript",
        avatar:
          "https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png",
        eliminated: false,
      },
      votes: 0,
      percent: 0,
    },
  ],
};

export { participants, gameData };
