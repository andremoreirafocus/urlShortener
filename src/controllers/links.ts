import {Request, Response} from 'express';
import {Link} from '../models/link';

import linksRepository from '../models/linksRepository';

// const links: Link[] = [];
// let proxId = 1;

function generateCode(){
  let text = '';
  const possible ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx0123456789'
  for (let i=0; i <5; i++) 
    text += possible.charAt(Math.floor(Math.random()*possible.length));
  
  return text;
}

async function postLink(request: Request, response: Response) {
  const link = request.body as Link;
  // link.id = proxId++;
  link.code = generateCode();
  link.hits = 0;
  // links.push(link);
  // response.status(201).json(link);
  const result = await linksRepository.add(link);
  if (!result.id)
    response.status(400).send({error: "Failed to create link record!"})
  else
    response.status(201).json(link);
}

async function getLink(request: Request, response: Response) {
  const code = request.params.code as string;

  // const link = links.find(link => link.code === code);
  const link = await linksRepository.findByCode(code);

  if (!link) 
    response.status(404).send({error: "code not found"});
  else
    response.status(200).json(link);
}

async function hitLink(request: Request, response: Response) {
  const code = request.params.code as string;

  // const index = links.find8Index(link => link.code === code);

  // // if (index === -1) 
  // //   response.status(404).send({error: "code not found"});
  // // else {
  // //   links[index].hits!++;
  // //   response.status(200).json(links[index]);
  // }

  const link = await linksRepository.hit(code);
  if (!link) 
    response.status(404).send({error: "code not found"});
  else {
    response.status(200).json(link);
  }
}

export default {
    postLink,
    getLink,
    hitLink
}