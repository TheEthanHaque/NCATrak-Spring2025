// app/database/populate_picklists.js
import { PrismaClient } from '@prisma/client';
import { load_config } from './config.js';
import pkg from 'pg';
const { Client } = pkg;

async function populatePickLists() {
  console.log('Populating pick lists...');
  
  try {
    // Connect to the database using config
    const config = load_config();
    const client = new Client(config);
    await client.connect();
    
    // First, create the necessary tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS pick_list_category (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS pick_list (
        list_id SERIAL PRIMARY KEY,
        category_id INTEGER NOT NULL,
        list_name VARCHAR(100) NOT NULL,
        FOREIGN KEY (category_id) REFERENCES pick_list_category (category_id)
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS pick_list_item (
        item_id SERIAL PRIMARY KEY,
        list_id INTEGER NOT NULL,
        value VARCHAR(255) NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (list_id) REFERENCES pick_list (list_id)
      );
    `);
    
    // Create the People Tab category
    const peopleCategory = await client.query(`
      INSERT INTO pick_list_category (category_name)
      VALUES ('People Tab')
      ON CONFLICT (category_id) DO NOTHING
      RETURNING category_id;
    `);
    
    const peopleCategoryId = peopleCategory.rows.length > 0 
      ? peopleCategory.rows[0].category_id 
      : (await client.query(`SELECT category_id FROM pick_list_category WHERE category_name = 'People Tab'`)).rows[0].category_id;
    
    // Create the Race pick list
    const racePickList = await client.query(`
      INSERT INTO pick_list (category_id, list_name)
      VALUES ($1, 'Race')
      ON CONFLICT DO NOTHING
      RETURNING list_id;
    `, [peopleCategoryId]);
    
    let raceListId;
    if (racePickList.rows.length > 0) {
      raceListId = racePickList.rows[0].list_id;
    } else {
      const existingRaceList = await client.query(`
        SELECT list_id FROM pick_list WHERE category_id = $1 AND list_name = 'Race'
      `, [peopleCategoryId]);
      
      if (existingRaceList.rows.length > 0) {
        raceListId = existingRaceList.rows[0].list_id;
      } else {
        throw new Error('Failed to create or find Race pick list');
      }
    }
    
    // Add race items
    const raceItems = [
      'American Indian/Alaska Native',
      'Asian',
      'Black/African American',
      'Hispanic/Latino',
      'Native Hawaiian/Pacific Islander',
      'White',
      'Multi-racial',
      'Other',
      'Unknown'
    ];
    
    // Check if items already exist
    const existingRaceItems = await client.query(`
      SELECT value FROM pick_list_item WHERE list_id = $1
    `, [raceListId]);
    
    const existingValues = existingRaceItems.rows.map(row => row.value);
    
    // Only add items that don't already exist
    for (let i = 0; i < raceItems.length; i++) {
      if (!existingValues.includes(raceItems[i])) {
        await client.query(`
          INSERT INTO pick_list_item (list_id, value, display_order)
          VALUES ($1, $2, $3)
        `, [raceListId, raceItems[i], i]);
      }
    }
    
    // Create more pick lists for the People category
    const lists = [
      { name: 'Religion', items: ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other', 'Unknown'] },
      { name: 'Language', items: ['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Other', 'Unknown'] },
      { name: 'Education Level', items: ['Pre-School', 'Elementary', 'Middle School', 'High School', 'Some College', 'Associate Degree', 'Bachelor\'s Degree', 'Graduate Degree'] },
      { name: 'Marital Status', items: ['Single', 'Married', 'Separated', 'Divorced', 'Widowed', 'Unknown'] }
    ];
    
    for (const list of lists) {
      // Create the pick list if it doesn't exist
      const pickList = await client.query(`
        INSERT INTO pick_list (category_id, list_name)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING list_id;
      `, [peopleCategoryId, list.name]);
      
      let listId;
      if (pickList.rows.length > 0) {
        listId = pickList.rows[0].list_id;
      } else {
        const existingList = await client.query(`
          SELECT list_id FROM pick_list WHERE category_id = $1 AND list_name = $2
        `, [peopleCategoryId, list.name]);
        
        if (existingList.rows.length > 0) {
          listId = existingList.rows[0].list_id;
        } else {
          console.warn(`Failed to create or find ${list.name} pick list`);
          continue;
        }
      }
      
      // Check existing items
      const existingItems = await client.query(`
        SELECT value FROM pick_list_item WHERE list_id = $1
      `, [listId]);
      
      const existingItemValues = existingItems.rows.map(row => row.value);
      
      // Add items that don't already exist
      for (let i = 0; i < list.items.length; i++) {
        if (!existingItemValues.includes(list.items[i])) {
          await client.query(`
            INSERT INTO pick_list_item (list_id, value, display_order)
            VALUES ($1, $2, $3)
          `, [listId, list.items[i], i]);
        }
      }
    }
    
    // Create more categories and pick lists
    const categories = [
      { 
        name: 'General Tab', 
        lists: [
          { name: 'Case Status', items: ['Open', 'Pending', 'Closed', 'Archived'] }
        ]
      },
      { 
        name: 'Mental Health Tab', 
        lists: [
          { name: 'MH Treatment Models', items: ['TF-CBT', 'EMDR', 'Play Therapy', 'ARC'] }
        ]
      }
    ];
    
    for (const category of categories) {
      // Create category if it doesn't exist
      const newCategory = await client.query(`
        INSERT INTO pick_list_category (category_name)
        VALUES ($1)
        ON CONFLICT DO NOTHING
        RETURNING category_id;
      `, [category.name]);
      
      let categoryId;
      if (newCategory.rows.length > 0) {
        categoryId = newCategory.rows[0].category_id;
      } else {
        const existingCategory = await client.query(`
          SELECT category_id FROM pick_list_category WHERE category_name = $1
        `, [category.name]);
        
        if (existingCategory.rows.length > 0) {
          categoryId = existingCategory.rows[0].category_id;
        } else {
          console.warn(`Failed to create or find ${category.name} category`);
          continue;
        }
      }
      
      for (const list of category.lists) {
        // Create the pick list if it doesn't exist
        const pickList = await client.query(`
          INSERT INTO pick_list (category_id, list_name)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
          RETURNING list_id;
        `, [categoryId, list.name]);
        
        let listId;
        if (pickList.rows.length > 0) {
          listId = pickList.rows[0].list_id;
        } else {
          const existingList = await client.query(`
            SELECT list_id FROM pick_list WHERE category_id = $1 AND list_name = $2
          `, [categoryId, list.name]);
          
          if (existingList.rows.length > 0) {
            listId = existingList.rows[0].list_id;
          } else {
            console.warn(`Failed to create or find ${list.name} pick list`);
            continue;
          }
        }
        
        // Check existing items
        const existingItems = await client.query(`
          SELECT value FROM pick_list_item WHERE list_id = $1
        `, [listId]);
        
        const existingItemValues = existingItems.rows.map(row => row.value);
        
        // Add items that don't already exist
        for (let i = 0; i < list.items.length; i++) {
          if (!existingItemValues.includes(list.items[i])) {
            await client.query(`
              INSERT INTO pick_list_item (list_id, value, display_order)
              VALUES ($1, $2, $3)
            `, [listId, list.items[i], i]);
          }
        }
      }
    }
    
    await client.end();
    console.log('Pick lists populated successfully!');
  } catch (error) {
    console.error('Error populating pick lists:', error);
    throw error;
  }
}

export function main() {
  return populatePickLists();
}

// Run this if called directly
if (process.argv[1] === import.meta.url) {
  populatePickLists()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default populatePickLists;