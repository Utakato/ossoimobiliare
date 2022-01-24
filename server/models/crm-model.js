const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MetaSchema = new Schema({
  limit: Number,
  next: String,
  offset: Number,
  previous: String,
  total_count: Number,
});

const AgentSchema = new Schema({
  avatar: String,
  email: String,
  first_name: String,
  id: Number,
  is_active: Boolean,
  last_name: String,
  phone: String,
  position: String,
  resource_uri: String,
});

const Residential_complexSchema = new Schema({
  id: Number,
  name: String,
  resource_uri: String,
});

const TagsSchema = new Schema({
  "Acces Internet": Array,
  "Alte spații": Array,
  "Amenajare străzi": Array,
  Arhitectură: Array,
  Bucătărie: Array,
  Contorizare: Array,
  Dotări: Array,
  "Dotări imobil": Array,
  Electrocasnice: Array,
  Ferestre: Array,
  "IT&C": Array,
  "Izolații termice": Array,
  Mobilat: Array,
  Pereți: Array,
  Priveliște: Array,
  "Sistem încălzire": Array,
  "Utilități de bază": Array,
  "Utilități generale": Array,
  "Uși interior": Array,
  "Ușă intrare": Array,
});

const Tags_enSchema = new Schema({
  Appliances: Array,
  Architecture: Array,
  "Basic utilities": Array,
  Features: Array,
  "Front door": Array,
  Furnished: Array,
  "General utilities": Array,
  "Heating system": Array,
  "IT&C": Array,
  "Interior doors": Array,
  "Internet access": Array,
  Kitchen: Array,
  Meters: Array,
  "Other spaces": Array,
  "Property amenities": Array,
  "Street amenities": Array,
  "Thermal insulation": Array,
  Views: Array,
  Walls: Array,
  Windows: Array,
});

const PropertySchema = new Schema({
  access_road_width: Number,
  agency_zone: String,
  agent: AgentSchema,
  apartment_type: Number,
  approved_construction: Boolean,
  approved_pud: Boolean,
  approved_puz: Boolean,
  approved_urbanism_certificate: Boolean,
  availability: Number,
  balconies: Number,
  bathrooms: Number,
  bedrooms: Number,
  building_construction_year: Number,
  building_floors: Number,
  building_retired_floors: Number,
  building_structure: Number,
  building_type: Number,
  building_underground_floors: Number,
  city: String,
  closed_transaction_type: Number,
  comfort: Number,
  commercial_building_type: Number,
  construction_on_land: Boolean,
  construction_status: Number,
  currency_rent: Number,
  currency_sale: Number,
  cut: Number,
  date_added: Date,
  date_modified: Date,
  date_modified_by_user: Date,
  date_transactioned: Date,
  date_validated: Date,
  description: String,
  description_en: String,
  destination: Array,
  disponibility: String,
  documents: Array,
  emission_index: Number,
  energy_class: Number,
  exclusive: Boolean,
  exclusive_rent: Boolean,
  exclusive_representation_rent: Boolean,
  exclusive_representation_sale: Boolean,
  exclusive_sale: Boolean,
  floor: Number,
  floor_multi: Array,
  footprint: Number,
  for_rent: Boolean,
  for_sale: Boolean,
  full_images: Array,
  garages: Number,
  guarantee_cost: Number,
  has_attic: Boolean,
  has_basement: Boolean,
  has_bathroom_window: Boolean,
  has_mansard: Boolean,
  has_semibasement: Boolean,
  historical_monument: Boolean,
  house_type: Number,
  id: Number,
  incidence: String,
  interior_height: Number,
  interior_state: Number,
  internal_id: String,
  is_available: Boolean,
  kitchens: Number,
  land_classification: Number,
  land_distance_from_utilities: Number,
  land_type: Number,
  landmark: String,
  lat: Number,
  lng: Number,
  lockers: Number,
  maintenance_cost: Number,
  nearby: String,
  nearby_en: String,
  negotiable_rent_price: Boolean,
  negotiable_sale_price: Boolean,
  office_building: Object,
  office_class: Number,
  office_occupy_rate: Number,
  office_partitioning: Number,
  openings_length: Number,
  orientation: Number,
  parking_overtheground: Number,
  parking_overtheground_cost: Number,
  parking_spots: Number,
  parking_underground: Number,
  parking_underground_cost: Number,
  partitioning: Number,
  pedestrian_traffic: Number,
  polish_year: Number,
  pot: Number,
  price_rent: Number,
  price_rent_history: Array,
  price_sale: Number,
  price_sale_history: Array,
  price_sqm_rent: Number,
  price_sqm_sale: Number,
  print_url: String,
  promote_carousel: Boolean,
  promote_commission_rent: String,
  promote_commission_sale: String,
  promote_custom_fields: Object,
  promote_exact_location: Boolean,
  promote_external: Boolean,
  promote_featured: Boolean,
  promote_flags: Array,
  property_type: Number,
  region: String,
  renewable_sources_consumption: Number,
  residential_complex: Residential_complexSchema,
  residential_complex_model: Object,
  resized_images: Array,
  resource_uri: String,
  roof: Number,
  rooms: Number,
  similar_properties: Array,
  sketches: Array,
  street: String,
  street_opening_length: Number,
  street_opening_type: Number,
  street_openings: Number,
  surface_balconies: Number,
  surface_built: Number,
  surface_land: Number,
  surface_office: Number,
  surface_office_available: Number,
  surface_office_minimum: Number,
  surface_production: Number,
  surface_storage: Number,
  surface_terrace: Number,
  surface_total: Number,
  surface_unit: Number,
  surface_useable: Number,
  surface_yard: Number,
  tags: TagsSchema,
  tags_en: Tags_enSchema,
  terraces: Number,
  thumbnail: String,
  title: String,
  title_en: String,
  total_energy_consumption: Number,
  tracking_code: String,
  upfront_cost: Number,
  vat_rent: Number,
  vat_sale: Number,
  verbose_floor: String,
  verbose_price: String,
  video_link: String,
  virtual_tour_link: String,
  window: Number,
  zero_commission_rent: Boolean,
  zero_commission_sale: Boolean,
  zone: String,
});

const CrmRebsSchema = new Schema({
  meta: MetaSchema,
  objects: Array,
});

const PropertyModel = mongoose.model("Property", PropertySchema);

module.exports = PropertyModel;
