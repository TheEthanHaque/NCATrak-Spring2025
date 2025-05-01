import { Router } from 'express';

const router = Router();

/**
 * @route GET /api/picklists/categories
 * @desc Get all pick list categories
 */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await req.prisma.pick_list_category.findMany({
      orderBy: {
        category_name: 'asc'
      }
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/picklists/categories/:id
 * @desc Get a category by id
 */
router.get('/categories/:id', async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await req.prisma.pick_list_category.findUnique({
      where: { category_id: categoryId }
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/picklists/categories
 * @desc Create a new category
 */
router.post('/categories', async (req, res, next) => {
  try {
    const newCategory = await req.prisma.pick_list_category.create({
      data: {
        category_name: req.body.category_name
      }
    });
    
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/picklists/lists
 * @desc Get all pick lists
 */
router.get('/lists', async (req, res, next) => {
  try {
    const lists = await req.prisma.pick_list.findMany({
      orderBy: {
        list_name: 'asc'
      },
      include: {
        category: true
      }
    });
    res.json(lists);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/picklists/lists/category/:categoryId
 * @desc Get all pick lists for a category
 */
router.get('/lists/category/:categoryId', async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const lists = await req.prisma.pick_list.findMany({
      where: { category_id: categoryId },
      orderBy: {
        list_name: 'asc'
      }
    });
    
    res.json(lists);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/picklists/lists/:id
 * @desc Get a pick list by id
 */
router.get('/lists/:id', async (req, res, next) => {
  try {
    const listId = parseInt(req.params.id);
    const list = await req.prisma.pick_list.findUnique({
      where: { list_id: listId },
      include: {
        category: true
      }
    });
    
    if (!list) {
      return res.status(404).json({ message: 'Pick list not found' });
    }
    
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/picklists/lists
 * @desc Create a new pick list
 */
router.post('/lists', async (req, res, next) => {
  try {
    const newList = await req.prisma.pick_list.create({
      data: {
        category_id: req.body.category_id,
        list_name: req.body.list_name
      }
    });
    
    res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/picklists/items/list/:listId
 * @desc Get all items for a pick list
 */
router.get('/items/list/:listId', async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const items = await req.prisma.pick_list_item.findMany({
      where: { list_id: listId },
      orderBy: {
        display_order: 'asc'
      }
    });
    
    res.json(items);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/picklists/items
 * @desc Create a new pick list item
 */
router.post('/items', async (req, res, next) => {
  try {
    // Get the current max display order
    const maxOrderResult = await req.prisma.pick_list_item.findMany({
      where: { list_id: req.body.list_id },
      orderBy: {
        display_order: 'desc'
      },
      take: 1,
      select: {
        display_order: true
      }
    });
    
    const nextOrder = maxOrderResult.length > 0 ? maxOrderResult[0].display_order + 1 : 0;
    
    const newItem = await req.prisma.pick_list_item.create({
      data: {
        list_id: req.body.list_id,
        value: req.body.value,
        display_order: nextOrder
      }
    });
    
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/picklists/items/:id
 * @desc Update a pick list item
 */
router.put('/items/:id', async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    
    const updatedItem = await req.prisma.pick_list_item.update({
      where: { item_id: itemId },
      data: {
        value: req.body.value,
        display_order: req.body.display_order !== undefined ? req.body.display_order : undefined
      }
    });
    
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/picklists/items/:id
 * @desc Delete a pick list item
 */
router.delete('/items/:id', async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    
    await req.prisma.pick_list_item.delete({
      where: { item_id: itemId }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/picklists/items/reorder
 * @desc Reorder pick list items
 */
router.put('/items/reorder', async (req, res, next) => {
  try {
    const { list_id, item_orders } = req.body;
    
    // item_orders should be an array of {item_id, display_order}
    if (!Array.isArray(item_orders)) {
      return res.status(400).json({ message: 'item_orders must be an array' });
    }
    
    // Update each item's display order in a transaction
    const updates = item_orders.map(item => 
      req.prisma.pick_list_item.update({
        where: { item_id: item.item_id },
        data: { display_order: item.display_order }
      })
    );
    
    await req.prisma.$transaction(updates);
    
    const updatedItems = await req.prisma.pick_list_item.findMany({
      where: { list_id: list_id },
      orderBy: {
        display_order: 'asc'
      }
    });
    
    res.json(updatedItems);
  } catch (error) {
    next(error);
  }
});

export default router;