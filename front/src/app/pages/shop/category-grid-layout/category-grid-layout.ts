import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-category-grid-layout',
  imports: [],
  templateUrl: './category-grid-layout.html',
  styleUrl: './category-grid-layout.css',
})
export class CategoryGridLayout {

  /*TODO: this is fake data that you'll eventually put in your db*/
  categories = [
    {
      id: 1,
      name: 'Camping',
      icon: 'camping',
      subcategories: [
        'Tents',
        'Sleeping Bags',
        'Sleeping Pads',
        'Camp Furniture',
        'Camp Kitchen',
        'Lanterns & Lighting',
        'Coolers',
        'Camp Accessories'
      ]
    },
    {
      id: 2,
      name: 'Hiking',
      icon: 'hiking',
      subcategories: [
        'Daypacks',
        'Trekking Poles',
        'Navigation',
        'Hydration',
        'Gaiters',
        'Trail Accessories',
        'First Aid'
      ]
    },
    {
      id: 3,
      name: 'Backpacking',
      icon: 'backpacking',
      subcategories: [
        'Backpacking Packs',
        'Ultralight Gear',
        'Backpacking Tents',
        'Sleeping Systems',
        'Cooking Systems',
        'Water Filters',
        'Bear Safety'
      ]
    },
    {
      id: 4,
      name: 'Climbing',
      icon: 'climbing',
      subcategories: [
        'Harnesses',
        'Helmets',
        'Ropes',
        'Carabiners',
        'Belay Devices',
        'Quickdraws',
        'Protection',
        'Chalk & Bags',
        'Climbing Shoes'
      ]
    },
    {
      id: 5,
      name: 'Cycling',
      icon: 'cycling',
      subcategories: [
        'Mountain Bikes',
        'Road Bikes',
        'Hybrid Bikes',
        'Bike Helmets',
        'Bike Clothing',
        'Bike Accessories',
        'Bike Components',
        'Bike Maintenance'
      ]
    },
    {
      id: 6,
      name: 'Running',
      icon: 'running',
      subcategories: [
        'Running Shoes',
        'Running Apparel',
        'Hydration',
        'GPS Watches',
        'Reflective Gear',
        'Recovery'
      ]
    },
    {
      id: 7,
      name: 'Fitness & Training',
      icon: 'fitness',
      subcategories: [
        'Weights',
        'Resistance Bands',
        'Cardio Equipment',
        'Exercise Mats',
        'Recovery Tools',
        'Training Accessories'
      ]
    },
    {
      id: 8,
      name: 'Water Sports',
      icon: 'kayaking',
      subcategories: [
        'Kayaking',
        'Canoeing',
        'Paddleboarding',
        'Surfing',
        'Snorkeling',
        'Life Jackets',
        'Dry Bags'
      ]
    },
    {
      id: 9,
      name: 'Winter Sports',
      icon: 'winter',
      subcategories: [
        'Skiing',
        'Snowboarding',
        'Snowshoeing',
        'Ice Skating',
        'Winter Clothing',
        'Goggles',
        'Helmets'
      ]
    },
    {
      id: 10,
      name: 'Fishing',
      icon: 'fishing',
      subcategories: [
        'Rods',
        'Reels',
        'Tackle',
        'Lures',
        'Fishing Apparel',
        'Waders',
        'Fishing Accessories'
      ]
    },
    {
      id: 11,
      name: 'Hunting',
      icon: 'hunting',
      subcategories: [
        'Hunting Clothing',
        'Boots',
        'Game Calls',
        'Tree Stands',
        'Packs',
        'Optics',
        'Safety Equipment'
      ]
    },
    {
      id: 12,
      name: 'Team Sports',
      icon: 'sports',
      subcategories: [
        'Soccer',
        'Basketball',
        'Baseball',
        'Softball',
        'Football',
        'Volleyball',
        'Hockey'
      ]
    },
    {
      id: 13,
      name: 'Golf',
      icon: 'golf',
      subcategories: [
        'Golf Clubs',
        'Golf Balls',
        'Golf Bags',
        'Golf Apparel',
        'Golf Shoes',
        'Golf Accessories'
      ]
    },
    {
      id: 14,
      name: 'Racquet Sports',
      icon: 'racquet',
      subcategories: [
        'Tennis',
        'Pickleball',
        'Badminton',
        'Squash',
        'Racquets',
        'Balls',
        'Accessories'
      ]
    },
    {
      id: 15,
      name: 'Footwear',
      icon: 'footwear',
      subcategories: [
        'Hiking Boots',
        'Trail Running Shoes',
        'Running Shoes',
        'Sandals',
        'Winter Boots',
        'Casual Shoes'
      ]
    },
    {
      id: 16,
      name: 'Apparel',
      icon: 'apparel',
      subcategories: [
        'Jackets',
        'Shirts',
        'Pants',
        'Shorts',
        'Base Layers',
        'Rainwear',
        'Hats',
        'Gloves'
      ]
    },
    {
      id: 17,
      name: 'Bags & Packs',
      icon: 'backpack',
      subcategories: [
        'Backpacks',
        'Duffel Bags',
        'Travel Packs',
        'Hydration Packs',
        'Dry Bags',
        'Waist Packs'
      ]
    },
    {
      id: 18,
      name: 'Electronics & GPS',
      icon: 'electronics',
      subcategories: [
        'GPS Devices',
        'Satellite Communicators',
        'Headlamps',
        'Smartwatches',
        'Power Banks',
        'Solar Chargers'
      ]
    },
    {
      id: 19,
      name: 'Nutrition & Hydration',
      icon: 'nutrition',
      subcategories: [
        'Energy Bars',
        'Freeze-Dried Meals',
        'Electrolytes',
        'Water Bottles',
        'Hydration Reservoirs',
        'Water Filters'
      ]
    },
    {
      id: 20,
      name: 'Travel & Adventure',
      icon: 'travel',
      subcategories: [
        'Luggage',
        'Packing Cubes',
        'Travel Accessories',
        'Travel Pillows',
        'Passport Wallets',
        'Travel Safety'
      ]
    }
  ];
  isActive = signal<string | boolean>(false);

  updateSignal(category: string){
    console.log(category);
    //if this has already been selected and the user clicked on it again, then stop showing sub-categories for given card
    if(this.isActive() === category){
      return this.isActive.set(false);
    }
    //otherwise, open up the subcategories of the selected card
    return this.isActive.set(category);
  }
}
