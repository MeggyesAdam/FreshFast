import { Injectable } from '@angular/core';
import { Dish, DishCategory } from '../models/food-interface';
import { User, UserAddress } from '../models/user-interface';
import { CartItem } from '../models/cart-item-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user: User | null = null;
  private cartItems: CartItem[] = [];
  private availableDishes: Dish[] = [
    {
      id: 1,
      name: 'Gulyásleves',
      description: 'Hagyományos magyar gulyásleves marhahúsból, sok zöldséggel és paprikával fűszerezve.',
      calories: 350,
      allergens: ['Glutén'],
      price: 1499,
      category: DishCategory.Soups,
      imageUrl: "/img/gulyasleves.png",
      ingredients: ['Marhahús', 'Burgonya', 'Paprika', 'Hagyma', 'Paradicsom', 'Fokhagyma', 'Pirospaprika', 'Só', 'Bors']
    },
    {
      id: 2,
      name: 'Húsleves',
      description: 'Erőleves házi csirkéből, cérnametélttel és friss zöldségekkel.',
      calories: 280,
      allergens: ['Glutén', 'Tojás'],
      price: 1299,
      category: DishCategory.Soups,
      imageUrl: "/img/husleves.png",
      ingredients: ['Csirkehús', 'Sárgarépa', 'Zeller', 'Petrezselyem', 'Hagyma', 'Cérnametélt', 'Só', 'Bors']
    },
    {
      id: 3,
      name: 'Hamburger',
      description: 'Lédús, grillezett marhahúspogácsa egy pirított buciban, ropogós salátával, érett paradicsommal, olvadt sajttal és pikáns szósszal.',
      calories: 800,
      allergens: ['Glutén', 'Laktóz'],
      price: 2499,
      category: DishCategory.MainCourses,
      imageUrl: "/img/hamburger.jpg",
      ingredients: ['Marhahús pogácsa', 'Hamburger buci', 'Saláta', 'Paradicsom', 'Sajt', 'Hagyma', 'Uborka', 'Majonéz', 'Ketchup']
    },
    {
      id: 4,
      name: 'Grillezett Csirkemell',
      description: 'Omlós csirkemell pirított zöldségekkel és tejszínes fokhagymás szósszal.',
      calories: 450,
      allergens: ['Laktóz'],
      price: 2899,
      category: DishCategory.MainCourses,
      imageUrl: "/img/grillcsirke.png",
      ingredients: ['Csirkemell', 'Cukkini', 'Paprika', 'Brokkoli', 'Tejszín', 'Fokhagyma', 'Olívaolaj', 'Só', 'Bors']
    },
    {
      id: 5,
      name: 'Bolognai Spagetti',
      description: 'Klasszikus olasz tészta gazdag marhahúsos paradicsomszósszal és parmezánnal.',
      calories: 720,
      allergens: ['Glutén', 'Laktóz'],
      price: 2199,
      category: DishCategory.MainCourses,
      imageUrl: "/img/bolognai.png",
      ingredients: ['Spagetti', 'Darált marhahús', 'Paradicsom szósz', 'Hagyma', 'Fokhagyma', 'Parmezán', 'Olívaolaj', 'Bazsalikom']
    },
    {
      id: 6,
      name: 'Vegán Buddha Bowl',
      description: 'Tápláló tál quinoával, pirított zöldségekkel, csicseriborsóval és tahini öntettel.',
      calories: 520,
      allergens: ['Szezámmag'],
      price: 2399,
      category: DishCategory.MainCourses,
      imageUrl: "/img/veganbuddha.png",
      ingredients: ['Quinoa', 'Édesburgonya', 'Csicseriborsó', 'Avokádó', 'Spenót', 'Paradicsom', 'Tahini', 'Citrom', 'Fűszerek']
    },
    {
      id: 7,
      name: 'Tiramisu',
      description: 'Hagyományos olasz desszert babapiskótával, mascarponéval és kávéval.',
      calories: 450,
      allergens: ['Glutén', 'Laktóz', 'Tojás'],
      price: 1299,
      category: DishCategory.Desserts,
      imageUrl: "/img/tiramisu.png",
      ingredients: ['Babapiskóta', 'Mascarpone', 'Tojás', 'Cukor', 'Espresso', 'Kakaópor', 'Marsala']
    },
    {
      id: 8,
      name: 'Somlói Galuska',
      description: 'Klasszikus magyar desszert három tésztával, dióval, csokoládéval és tejszínhabbal.',
      calories: 520,
      allergens: ['Glutén', 'Laktóz', 'Tojás', 'Diófélék'],
      price: 1399,
      category: DishCategory.Desserts,
      imageUrl: "/img/somloi.png",
      ingredients: ['Piskóta', 'Dió', 'Csokoládé', 'Mazsola', 'Rum', 'Tejszínhab', 'Vanília', 'Cukor']
    },
    {
      id: 9,
      name: 'Frissen Facsart Narancslé',
      description: 'Természetes, 100% frissen facsart narancslé hozzáadott cukor nélkül.',
      calories: 110,
      allergens: [],
      price: 799,
      category: DishCategory.Drinks,
      imageUrl: "/img/narancsle.png",
      ingredients: ['Friss narancs']
    },
    {
      id: 10,
      name: 'Limonádé',
      description: 'Házi készítésű limonádé friss citromból, mentával és mézzel.',
      calories: 90,
      allergens: [],
      price: 699,
      category: DishCategory.Drinks,
      imageUrl: "/img/limonade.png",
      ingredients: ['Citrom', 'Víz', 'Méz', 'Menta', 'Jég']
    },
  ];


  public getDishes(): Dish[] {
    return this.availableDishes;
  }

  public setUser(user: User) {
    this.user = user;
  }

  public getUser(): User | null {
    return this.user;
  }

  public addToCart(dish: Dish, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.dish.id === dish.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ dish, quantity });
    }
  }

  public removeFromCart(dishId: number): void {
    this.cartItems = this.cartItems.filter(item => item.dish.id !== dishId);
  }

  public updateCartItemQuantity(dishId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(dishId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  public getCartItems(): CartItem[] {
    return this.cartItems;
  }

  public getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.dish.price * item.quantity), 0);
  }

  public clearCart(): void {
    this.cartItems = [];
  }

  public getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  public setUserAddress(address: UserAddress) {
    if (this.user !== null) {
      this.user!.address = address;
    }
  }

  public getUserAddress(): UserAddress | null {
    return this.user?.address || null;
  }

  public setUserEmail(email: string) {
    if (this.user !== null) {
      this.user.email = email;
    }
  }
}
