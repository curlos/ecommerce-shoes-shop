const axios = require('axios')
const mongoose = require('mongoose')
const database = require('../database/connection')
const Shoe = require('../models/Shoe')

const timer = (ms: number | undefined) => new Promise(res => setTimeout(res, ms))

const getAllBrands = async () => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/brands',
    headers: {
      'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      'x-rapidapi-key': '7b5c381447mshbd5800218d682e4p13654ejsnb9e8c218cf2f'
    }
  };

  try {
    const response = await axios.request(options)
    const allBrands = await response.data.results
    return allBrands
  } catch (err) {
    console.error(err)
  }
}

const addShoesToDatabase = async (options: Object) => {
  try {
    const response = await axios.request(options)
    const shoes = response.data.results

    shoes.forEach(async (shoe: any) => {
      const { id, sku, brand, name, colorway, gender, silhouette, releaseYear, releaseDate, retailPrice, estimatedMarketValue, story, image, links } = shoe

      const newShoe = new Shoe(
        {
          shoeID: id,
          sku,
          brand,
          name,
          colorway,
          gender,
          silhouette,
          releaseYear,
          releaseDate,
          retailPrice,
          estimatedMarketValue,
          story,
          image: {
            "360": image["360"],
            original: image.original,
            small: image.small,
            thumbnail: image.thumbnail,
          },
          links,
        }
      )

      console.log('Saving: ')

      await newShoe.save((err: Error, result: typeof Shoe) => {
        console.log(result)
        if (err) return console.error(err)
        console.log(result.name + " saved to sneaker collection")
      })

      console.log("All shoes have been added to database!")
    })

    return response.data.results
  } catch (err) {
    console.error(err)
  }
}

const addOneShoeToDatabase = async (options: Object) => {
  try {
    const response = await axios.request(options)
    const shoes = response.data.results
    const shoe = shoes[0]

    console.log(shoes)

    console.log(shoe)

    const { id, sku, brand, name, colorway, gender, silhouette, releaseYear, releaseDate, retailPrice, estimatedMarketValue, story, image, links } = shoe

    const newShoe = new Shoe(
      {
        shoeID: id,
        sku,
        brand,
        name,
        colorway,
        gender,
        silhouette,
        releaseYear,
        releaseDate,
        retailPrice,
        estimatedMarketValue,
        story,
        image: {
          "360": image["360"],
          original: image.original,
          small: image.small,
          thumbnail: image.thumbnail,
        },
        links,
      }
    )

    console.log('Saving: ')

    await newShoe.save((err: Error, result: typeof Shoe) => {
      console.log(result)
      if (err) return console.error(err)
      console.log(result.name + " saved to sneaker collection")
    })

    return response.data.results
  } catch (err) {
    console.log('rip')
    console.error(err)
  }
}


const getShoesFromBrand = async (brand: String) => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '20', brand: brand },
    headers: {
      'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      'x-rapidapi-key': '7b5c381447mshbd5800218d682e4p13654ejsnb9e8c218cf2f'
    }
  };

  return addShoesToDatabase(options)
}

const getShoesFromAllBrands = async () => {
  const allBrands = await getAllBrands()
  const shoes: { [key: string]: [] } = {}

  for (let brand of allBrands) {
    console.log(`Getting sneakers from '${brand}'`)
    const brandShoes = await getShoesFromBrand(brand)
    shoes[brand] = brandShoes

    await timer(2000)
  }

  console.log(shoes)
  console.log('All shoes have been retrieved!')
}

const addAllShoes = async (pageNum: number) => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '100', page: pageNum },
    headers: {
      'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      'x-rapidapi-key': '7b5c381447mshbd5800218d682e4p13654ejsnb9e8c218cf2f'
    }
  }

  return addShoesToDatabase(options)
}

const addAllShoesByBrand = async (brand: string) => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '100', brand: brand },
    headers: {
      'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      'x-rapidapi-key': '7b5c381447mshbd5800218d682e4p13654ejsnb9e8c218cf2f'
    }
  };

  return addShoesToDatabase(options)
}

const addShoeByName = async (name: string) => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '100', name: name },
    headers: {
      'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      'x-rapidapi-key': '7b5c381447mshbd5800218d682e4p13654ejsnb9e8c218cf2f'
    }
  };

  return addOneShoeToDatabase(options)
}

module.exports = {
  getAllBrands,
  getShoesFromBrand,
  getShoesFromAllBrands,
  addAllShoes,
  addShoeByName,
  addAllShoesByBrand
}