import { NextFunction, Request, Response, Router } from "express";

const router = Router();

const userData = [
  {id: 1, name: "Sam"},
  {id: 2, name: "Bob"},
  {id: 3, name: "Joe"},
];

const fetchUserData = (): Promise<typeof userData> => {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    setTimeout(() => {
      if(randomNum === 1) {
        reject("Error: Something went wrong!");
      } else {
        resolve(userData);
      }
    }, 1000);
  })
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (!id) {
    return next(new Error("Id is required!"));
    // res.status(400).send({ message: "Id is required!" });
  }
  try {
    const fetchedUserData = await fetchUserData();
    let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id as string));
    res.status(200).send({ data: filteredUserData });
  } catch (err) {
    res.status(500).send({ message: err });
  }

};


const postHandler = (req: Request, res: Response) => {
  const { name } = req.body;
  if(!name) {
    throw new Error("Name is required!");
    // res.status(400).send({ message: "Name is required!" });
  }

  const newUser = {
    id: userData.length + 1,
    name,
  };

  userData.push(newUser);
  res.status(201).send({ data: newUser });
};

router.get("/users", getHandler);
router.post("/users", postHandler);

export default router;