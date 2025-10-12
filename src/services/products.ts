import type { Product } from "@/types/types";

// ============
// Базовые настройки
// ============
const RAW_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "/api").replace(/\/+$/, "");
// Всегда используем относительный путь в браузере, чтобы обойти CORS через Next.js rewrite
const API_BASE = typeof window !== "undefined" ? "/api" : RAW_BASE;

interface FetchOptions extends RequestInit {
  body?: unknown;
}

// Универсальный fetch
async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, ...rest } = options;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {})
    },
    ...rest,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `API error [${response.status}] ${response.statusText}: ${errText}`
    );
  }

  return response.json() as Promise<T>;
}

// ============================
// Types
// ============================
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  orderNumber?: string;
  customerId?: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod: "card" | "cash" | "liqpay" | "other";
  shippingMethod: string;
  items: OrderItem[];
  subTotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount?: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  trackingNumber?: string;
  deliveredAt?: string;
  customerNotes?: string;
  adminNotes?: string;
}

// ============================
// Normalizer (API → фронт)
// ============================
type RawSelectedOption = { id: string; value: string; attributeId?: string | null };
type RawAttribute = {
  id: string;
  name: string;
  key: string;
  required: boolean;
  values?: { id: string; value: string }[] | null;
};
type RawProduct = {
  id: string;
  name: string;
  price?: number | string | null;
  description?: string | null;
  sku: string;
  stock?: boolean | number | null;
  status?: string;
  mainImage?: string | null;
  images?: string[] | null;
  comparePrice?: number | string | null;
  translations?: Record<string, string> | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  weight?: number | null;
  dimensions?: Record<string, unknown> | null;
  brand?: { id: string; name: string; slug: string } | null;
  category?: { id: string; name: string; slug: string } | null;
  attributes?: RawAttribute[] | null;
  selectedOptions?: RawSelectedOption[] | null;
};

function normalizeProduct(p: RawProduct): Product {
  // Создаем словарь selectedOptions по attributeId
  const optionsByAttrId: Record<string, { id: string; value: string }[]> = {};

  if (Array.isArray(p.selectedOptions)) {
    for (const opt of p.selectedOptions) {
      // Если у объекта есть поле attributeId от бекенда
      const attrId = opt.attributeId || "default";
      if (!optionsByAttrId[attrId]) optionsByAttrId[attrId] = [];
      optionsByAttrId[attrId].push({ id: opt.id, value: opt.value });
    }
  }

  // Detect if backend options are not linked to attributes (no attributeId fields)
  const optionsLackAttributeLink = Array.isArray(p.selectedOptions)
    ? p.selectedOptions.every((opt) => opt.attributeId == null)
    : false;

  return {
    id: p.id,
    name: p.name,
    price: Number(p.price ?? 0) || 0,
    description: p.description,
    sku: p.sku,
    stock: Boolean(p.stock),
    status: p.status,
    mainImage: p.mainImage ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
    translations: p.translations,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    weight: p.weight,
    dimensions: p.dimensions,
    brand: p.brand
      ? {
          id: p.brand.id,
          name: p.brand.name,
          slug: p.brand.slug,
        }
      : null,
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
        }
      : null,
      attributes: Array.isArray(p.attributes)
      ? p.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          key: attr.key,
          required: attr.required,
          // Prefer explicit values from API if present; fallback to selectedOptions mapping
          values: Array.isArray(attr.values) && attr.values.length
            ? attr.values.map((v) => ({ id: v.id, value: v.value }))
            : (
                // If options are not linked by attributeId and there is only one attribute,
                // assign all selectedOptions to this single attribute.
                optionsLackAttributeLink && Array.isArray(p.attributes) && p.attributes.length === 1
                  ? (p.selectedOptions ?? [])
                  : (p.selectedOptions ?? []).filter((opt) => opt.attributeId === attr.id)
              ).map((opt) => ({ id: opt.id, value: opt.value })),
        }))
      : [],
    
    
    selectedOptions: Array.isArray(p.selectedOptions)
      ? p.selectedOptions.map((opt) => ({
          id: opt.id,
          value: opt.value,
        }))
      : [],
  };
}


// ============================
// API функции
// ============================

// Все продукты
export async function fetchProducts(): Promise<Product[]> {
  const raw = await apiFetch<{ products?: RawProduct[]; data?: RawProduct[] }>(`/products`);
  const products: RawProduct[] | undefined = raw.products ?? raw.data;

  if (!products) {
    throw new Error("Invalid response format: no products");
  }

  return products.map(normalizeProduct);
}

// Один продукт по id
export async function fetchProductById(id: string): Promise<Product | null> {
  // Try detailed endpoint first
  try {
    const raw = await apiFetch<{ data?: RawProduct; product?: RawProduct } | RawProduct>(`/products/${encodeURIComponent(id)}`);
    const p = (typeof raw === "object" && raw !== null && "id" in raw)
      ? (raw as RawProduct)
      : (raw as { data?: RawProduct; product?: RawProduct }).data ?? (raw as { data?: RawProduct; product?: RawProduct }).product;
    if (p) {
      const normalized = normalizeProduct(p);
      // If attributes are present, use it; otherwise fallback to list
      if (Array.isArray(normalized.attributes) && normalized.attributes.length > 0) {
        return normalized;
      }
    }
  } catch (_) {
    // ignore, fallback below
  }

  // Fallback: fetch from list where attributes are included
  try {
    const list = await fetchProducts();
    const fromList = list.find((prod) => prod.id === id) || null;
    return fromList ?? null;
  } catch (_) {
    return null;
  }
}

// Создать заказ
export async function createOrder(order: Order): Promise<any> {
  return apiFetch(`/orders`, {
    method: "POST",
    body: order
  });
}
