import * as yup from 'yup'

const ItemMasterSchema = yup.object({
    itemName: yup.string().required(),
    unit: yup.string().required(),
    category: yup.string().required(),
    Mrp: yup.string().required(),
})

const PartiesSchema = yup.object({
    Name: yup.string().required(),
    type: yup.string().required(),
    contactNo: yup.number().required(),
    Address: yup.string().required(),
})

const PurchaseitemSchema = yup.object().shape({
    itemName: yup.string().required('Item name is required'),
    // unit: yup.string().required('Quantity is required'),
    quantity: yup.number().required('quantity is required').min(1, 'quantity must be at least 1'),
    rate: yup.number().required('rate is required')
});

const Purchaseschema = yup.object({
    partyName: yup.string().required(),
    items: yup.array().of(PurchaseitemSchema).min(1, 'At least one item is required'),
    // mrp: yup.number().required().min(1),
    totalAmount: yup.number().required(),
    type: yup.string().required(),
    Date: yup.string().required(),
    BillNum: yup.number().required(),
    Added_item: yup.number().min(1, 'At least one item is required'),
})

const PurchaseitemSchemaForForm = yup.object({
    itemName: yup.string().required('Item name is required'),
    // unit: yup.string().required('Quantity is required'),
    quantity: yup.number().required('quantity is required').min(1, 'quantity must be at least 1'),
    rate: yup.number().required('rate is required')
});

const SaleItemSchema = yup.object().shape({
    itemName: yup.string().required("item name is required"),
    currentStock: yup.number().required("/"),
    unit: yup.string().required("/"),
    Mrp: yup.number().required("/"),
    quantity: yup.number().required('quantity is required').min(1, 'quantity must be at least 1')
})

const SalesSchema = yup.object({
    partyName: yup.string().required(),
    saleType: yup.string().required(),
    Added_item: yup.number().min(1, 'At least one item is required'),
    total: yup.number().required(),
    Date: yup.string().required(),
    BillNum: yup.string().min(10).max(10).required(),
});

const saleItemFormSchema = yup.object({
    itemName: yup.string().required(),
    quantity:  yup.number().required('').min(1, ' must be at least 1'),
})
const CashBookSchmema = yup.object({
    Date: yup.string().required(),
    ReceiptType: yup.string().required(),
    Ammount: yup.string().required(),
    Discription: yup.string().required(),
    category: yup.string().required(),
    // PendingAmmount: yup.number().required(),
    // RefBillNo: yup.number().positive().integer().when('category', {
    //     is: 'Sale',
    //     then: yup.number().integer().required(),
    //     otherwise: (schema) => schema
    // })
})

const intialAmountSchema = yup.object({
    intialAmount: yup.number().required(),
})

const CategorySchmema = yup.object({
    Name: yup.string().required()
})
const UnitSchema = yup.object({
    Name: yup.string().required()
})

export { ItemMasterSchema, PartiesSchema, Purchaseschema, SalesSchema, CashBookSchmema, intialAmountSchema, CategorySchmema, UnitSchema,saleItemFormSchema,PurchaseitemSchemaForForm }