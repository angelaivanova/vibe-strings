import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
      origin
      categories
    }
  }`
;

export const GET_MODELS_BY_BRAND = gql`
  query GetModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description   
      price
    }
  }`
;

export const GET_GUITAR_DETAILS = gql`
  query GetGuitar($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      image
      type
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }`
;
export const GET_UNIQUE_BRAND = gql`
  query GetBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      image
      origin
      categories
    }
  }
`;