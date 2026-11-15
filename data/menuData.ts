export type AllergenId = "spicy" | "wheat" | "nuts" | "milk" | "sesame";

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedText;
  desc: LocalizedText;
  price: number;
  calories?: number;
  image: string;
  allergens: AllergenId[];
}

export interface MenuCategory {
  id: string;
  order: number;
  name: LocalizedText;
  subtitle: LocalizedText;
  thumbnail: string;
  items: MenuItem[];
}

export const ALLERGEN_LABELS: Record<AllergenId, { ar: string; en: string; icon: string }> = {
  spicy: { ar: "حار", en: "Spicy", icon: "🌶" },
  wheat: { ar: "قمح", en: "Wheat / Gluten", icon: "🌾" },
  nuts: { ar: "جوز", en: "Walnuts / Nuts", icon: "🌰" },
  milk: { ar: "حليب", en: "Dairy / Milk", icon: "🥛" },
  sesame: { ar: "سمسم", en: "Sesame", icon: "✦" },
};

export const SET_MENU_DATA = {
  title: { ar: "قائمة الغداء الملكية | SET MENU", en: "SET MENU | Royal Iraqi Lunch" },
  price: 115,
  unit: { ar: "115 ر.س للشخص", en: "115 SAR per person" },
  subtitle: {
    ar: "تجربة غداء عراقية متكاملة تجمع أشهر أطباق أغاتي من الشوربة والمقبلات حتى الطبق الرئيسي والحلويات",
    en: "A complete Iraqi culinary journey featuring Aghatti's signature soups, mezze, main courses, desserts & beverages"
  },
  courses: [
    {
      step: "01",
      title: { ar: "الشوربة", en: "Soup Course" },
      detail: { ar: "اختيارك من شوربة العدس العراقية أو شوربة الكريمة أو شوربة باجي", en: "Choice of Traditional Lentil Soup, Cream Soup, or Pacha Soup" }
    },
    {
      step: "02",
      title: { ar: "السلطات", en: "Fresh Salads" },
      detail: { ar: "سلطة الباذنجان العراقية، تبولة، أو سلطة الفتوش بدبس الرمان", en: "Iraqi Eggplant Salad, Tabbouleh, or Pomegranate Fattoush" }
    },
    {
      step: "03",
      title: { ar: "المقبلات الباردة والساخنة", en: "Cold & Hot Appetizers" },
      detail: { ar: "تشكيلة حمص، متبل، محمرة، ورق عنب مع كبة أرز وكبة لحم وبوريك", en: "Assorted Hummus, Moutabbal, Muhammara & Vine Leaves with Rice Kubba, Meat Kubba & Borek" }
    },
    {
      step: "04",
      title: { ar: "الطبق الرئيسي والتمن", en: "Main Course & Iraqi Rice" },
      detail: { ar: "اختيارك من المسكوف العراقي على الحطب أو قوزي اللحم أو المشاوي مع تمن باقيلاء وتمن برياني", en: "Choice of Wood-Fired Iraqi Masgouf, Lamb Quzi, or Charcoal Grills served with Dill Fava Rice & Biryani Rice" }
    },
    {
      step: "05",
      title: { ar: "الحلويات والمشروبات", en: "Desserts & Beverages" },
      detail: { ar: "مدكوكة أغاتي أو أم علي أو عثملية مع المشروبات الغازية والشاي العراقي المهيل", en: "Aghatti Madkouka, Umm Ali, or Othmalieh served with soft drinks & Iraqi cardamom tea" }
    }
  ]
};

export const MENU_DATA: MenuCategory[] = [
  // =========================================================================
  // 1. الشوربات | Soups (4 Dishes)
  // =========================================================================
  {
    id: "soups",
    order: 1,
    name: { ar: "الشوربات", en: "Soups" },
    subtitle: { ar: "شوربات عراقية دافئة محضرة يومياً", en: "Warm Iraqi & coastal soups simmered daily" },
    thumbnail: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "lentil-soup",
        name: { ar: "شوربة عدس", en: "Lentil Soup" },
        desc: {
          ar: "شوربة عدس بلاد الرافدين التقليدية المطبوخة ببطء مع الشعيرية والكمون وزيت الزيتون",
          en: "Traditional Mesopotamian golden lentil soup slow-simmered with toasted vermicelli and cumin"
        },
        price: 23,
        calories: 348,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "cream-soup",
        name: { ar: "شوربة كريمة", en: "Cream Soup" },
        desc: {
          ar: "شوربة كريمة غنية وناعمة بقطع الدجاج الطرية والأعشاب العطرية",
          en: "Velvety rich cream soup simmered with tender chicken pieces and aromatic herbs"
        },
        price: 24,
        calories: 485,
        image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "wheat"]
      },
      {
        id: "seafood-soup",
        name: { ar: "شوربة البحريات", en: "Seafood Soup" },
        desc: {
          ar: "شوربة ثمار البحر الغنية بالروبيان والكالماري والكريمة الطازجة",
          en: "Coastal seafood bisque enriched with jumbo prawns, calamari, and fresh cream"
        },
        price: 39,
        calories: 342,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "wheat"]
      },
      {
        id: "pacha-soup",
        name: { ar: "شوربة باجي", en: "Pacha Soup" },
        desc: {
          ar: "مرق الباجي العراقي التراثي الغني المطبوخ ببطء مع البهارات العراقية والليمون الأسود",
          en: "Authentic slow-simmered Iraqi Pacha broth infused with Basra black lime and traditional spices"
        },
        price: 26,
        calories: 390,
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      }
    ]
  },

  // =========================================================================
  // 2. المقبلات الباردة | Cold Appetizers (8 Dishes)
  // =========================================================================
  {
    id: "cold-appetizers",
    order: 2,
    name: { ar: "المقبلات الباردة", en: "Cold Appetizers" },
    subtitle: { ar: "مازات عراقية ومشرقية أصيلة بزيت الزيتون البكر", en: "Signature Iraqi & Levantine cold mezze" },
    thumbnail: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "muhammara",
        name: { ar: "محمرة", en: "Muhammara" },
        desc: {
          ar: "مزيج فاخر من الجوز المحمص ودبس الرمان ودبس الفليفلة وزيت الزيتون",
          en: "Roasted crushed walnuts blended with pomegranate molasses, red pepper paste, and olive oil"
        },
        price: 35,
        calories: 785,
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat", "sesame"]
      },
      {
        id: "eggplant-moutabbal",
        name: { ar: "متبل باذنجان", en: "Eggplant Moutabbal" },
        desc: {
          ar: "باذنجان مشوي على الفحم مهروس مع الطحينة ودبس الرمان والجوز وحب الرمان",
          en: "Charcoal-roasted eggplant mashed with tahini, pomegranate molasses, walnuts, and pomegranate seeds"
        },
        price: 35,
        calories: 447,
        image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=1200&q=90",
        allergens: ["sesame", "nuts", "milk"]
      },
      {
        id: "hummus",
        name: { ar: "حمص", en: "Hummus" },
        desc: {
          ar: "حمص ناعم بالطحينة على طريقة بلاد الرافدين مع زيت الزيتون البكر",
          en: "Silky Mesopotamian chickpea puree blended with artisanal tahini and extra-virgin olive oil"
        },
        price: 33,
        calories: 620,
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=90",
        allergens: ["sesame"]
      },
      {
        id: "hummus-prawns",
        name: { ar: "حمص بالروبيان", en: "Hummus with Prawns" },
        desc: {
          ar: "حمص بالطحينة يعلوه روبيان متبل ومطهو بالزبدة والبهارات الخاصة",
          en: "Creamy tahini hummus crowned with sautéed spiced prawns and herb butter"
        },
        price: 55,
        calories: 851,
        image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=90",
        allergens: ["sesame", "milk"]
      },
      {
        id: "hummus-meat",
        name: { ar: "حمص باللحمة", en: "Hummus with Meat" },
        desc: {
          ar: "حمص بالطحينة وزيت الزيتون مع مكعبات اللحم الطرية والمكسرات المحمصة",
          en: "Velvety hummus topped with seared tender lamb cubes and toasted pine nuts"
        },
        price: 52,
        calories: 864,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90",
        allergens: ["sesame", "nuts", "milk"]
      },
      {
        id: "vine-leaves",
        name: { ar: "ورق عنب", en: "Vine Leaves" },
        desc: {
          ar: "ورق عنب محشي بالأرز والأعشاب ودبس الرمان على طريقة بلاد الرافدين",
          en: "Hand-rolled grape leaves stuffed with herbed rice and pomegranate molasses"
        },
        price: 35,
        calories: 645,
        image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "yogurt-salad",
        name: { ar: "سلطة الزبادي", en: "Yogurt Salad" },
        desc: {
          ar: "لبن زبادي طازج مع الخيار المفروم والنعناع المجفف ولمسة ثوم خفيفة",
          en: "Chilled creamy yogurt tossed with crisp diced cucumber and dried mint"
        },
        price: 25,
        calories: 145,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "beetroot-hummus",
        name: { ar: "حمص شمندر", en: "Beetroot Hummus" },
        desc: {
          ar: "حمص كريمي بالطحينة ممزوج بالشمندر المشوي وزيت الزيتون والجوز",
          en: "Smooth tahini hummus infused with roasted ruby beetroot and olive oil"
        },
        price: 35,
        calories: 450,
        image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=1200&q=90",
        allergens: ["sesame", "nuts"]
      }
    ]
  },

  // =========================================================================
  // 3. المقبلات الساخنة | Hot Appetizers (8 Dishes)
  // =========================================================================
  {
    id: "hot-appetizers",
    order: 3,
    name: { ar: "المقبلات الساخنة", en: "Hot Appetizers" },
    subtitle: { ar: "كبة عراقية مقرمشة، بوريك، وأطباق ساخنة", en: "Golden Iraqi kubba, crispy borek & hot starters" },
    thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "spicy-potato",
        name: { ar: "بطاطا حارة", en: "Spicy Potatoes" },
        desc: {
          ar: "مكعبات البطاطس المقلية المتبلة بالثوم والكزبرة الخضراء والفلفل الحار",
          en: "Crispy potato cubes wok-tossed with garlic, fresh coriander, and red chili"
        },
        price: 29,
        calories: 420,
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=90",
        allergens: ["spicy"]
      },
      {
        id: "chicken-liver",
        name: { ar: "كبدة الدجاج", en: "Chicken Liver" },
        desc: {
          ar: "كبدة دجاج طازجة مطهوة مع البصل والبهارات وتقدم مع دبس الرمان",
          en: "Pan-seared chicken livers glazed with tangy pomegranate molasses and warm spices"
        },
        price: 33,
        calories: 577,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "boiled-pacha",
        name: { ar: "باجي مسلوق", en: "Boiled Pacha" },
        desc: {
          ar: "باجي عراقي تقليدي مسلوق ومطهو بعناية بالبهارات العطرية والليمون الأسود",
          en: "Traditional slow-boiled Iraqi Pacha seasoned with aromatic spices and black lime"
        },
        price: 32,
        calories: 380,
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "rice-kubba",
        name: { ar: "كبة أرز", en: "Rice Kubba" },
        desc: {
          ar: "كبة أرز حلب العراقية المقرمشة محشوة بلحم الغنم المفروم والكشمش واللوز",
          en: "Golden crispy saffron rice kubba stuffed with spiced minced lamb, raisins, and almonds"
        },
        price: 33,
        calories: 510,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts"]
      },
      {
        id: "meat-kubba",
        name: { ar: "كبة لحم", en: "Meat Kubba" },
        desc: {
          ar: "عجينة البرغل واللحم المقلية محشوة بلحم الغنم والمكسرات مع دبس الرمان",
          en: "Crisp bulgur and meat shell filled with seasoned lamb and pine nuts, served with pomegranate molasses"
        },
        price: 39,
        calories: 396,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "nuts"]
      },
      {
        id: "vegetable-borek",
        name: { ar: "بوريك خضار", en: "Vegetable Borek" },
        desc: {
          ar: "رقائق البوريك العراقية المقرمشة المحشوة بالخضار المتبلة ببهارات بلاد الرافدين",
          en: "Crisp Iraqi pastry rolls filled with Mesopotamian-spiced seasonal vegetables"
        },
        price: 32,
        calories: 453,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "sesame"]
      },
      {
        id: "meat-borek",
        name: { ar: "بوريك لحم", en: "Meat Borek" },
        desc: {
          ar: "عجينة البوريك الذهبية المقرمشة المحشوة باللحم المفروم والبصل والبهارات العراقية",
          en: "Flaky golden Iraqi borek stuffed with seasoned minced lamb and caramelized onions"
        },
        price: 34,
        calories: 495,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "cheese-samosa",
        name: { ar: "سمبوسة جبنة", en: "Cheese Samosa" },
        desc: {
          ar: "سمبوسة مقرمشة محشوة بخلطة الأجبان الغنية والنعناع الأخضر",
          en: "Crispy golden samosa triangles filled with melted mozzarella cheese and fresh mint"
        },
        price: 32,
        calories: 480,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk"]
      }
    ]
  },

  // =========================================================================
  // 4. السلطات | Salads (9 Dishes)
  // =========================================================================
  {
    id: "salads",
    order: 4,
    name: { ar: "السلطات", en: "Salads" },
    subtitle: { ar: "سلطات طازجة بتتبيلات دبس الرمان والأعشاب", en: "Crisp garden salads with signature dressings" },
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "quinoa-salad",
        name: { ar: "سلطة الكينوا", en: "Quinoa Salad" },
        desc: {
          ar: "خليط من حبوب الكينوا والجرجير والشمندر والرمان مع صلصة الليمون وزيت الزيتون",
          en: "Organic quinoa, baby rocket, roasted beetroot, and pomegranate with citrus dressing"
        },
        price: 45,
        calories: 380,
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts"]
      },
      {
        id: "iraqi-eggplant-salad",
        name: { ar: "سلطة الباذنجان العراقية", en: "Iraqi Eggplant Salad" },
        desc: {
          ar: "سلطة تقليدية من بلاد الرافدين مكونة من الباذنجان المقرمش والخضار مع دبس الرمان",
          en: "Traditional Mesopotamian salad of golden crisp eggplant and fresh vegetables with pomegranate molasses"
        },
        price: 37,
        calories: 342,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "fattoush-salad",
        name: { ar: "سلطة الفتوش", en: "Fattoush Salad" },
        desc: {
          ar: "خليط من الخس والأعشاب والخبز المحمص والسماق مع صلصة دبس الرمان",
          en: "Garden greens, herbs, and crispy toasted bread tossed in sumac and pomegranate molasses"
        },
        price: 34,
        calories: 265,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "tabbouleh",
        name: { ar: "تبولة", en: "Tabbouleh" },
        desc: {
          ar: "بقدونس طازج مفروم ناعماً مع الطماطم والبرغل وعصير الليمون وزيت الزيتون",
          en: "Finely chopped parsley, vine tomatoes, and fine bulgur dressed in lemon juice and olive oil"
        },
        price: 34,
        calories: 222,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "beetroot-salad",
        name: { ar: "سلطة الشمندر", en: "Beetroot Salad" },
        desc: {
          ar: "شرائح الشمندر الممزوجة بالجرجير الطازج والجبن والجوز وصلصة الليمون",
          en: "Ruby beetroot slices tossed with baby rocket, artisanal cheese, and citrus vinaigrette"
        },
        price: 32,
        calories: 145,
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "nuts"]
      },
      {
        id: "al-wadi-salad",
        name: { ar: "سلطة الوادي", en: "Al-Wadi Salad" },
        desc: {
          ar: "تشكيلة غنية من الأوراق الخضراء والمكسرات المحمصة والفواكه المجففة بتتبيلة أغاتي الخاصة",
          en: "Signature harvest greens tossed with roasted nuts, dried fruits, and Aghatti house dressing"
        },
        price: 39,
        calories: 360,
        image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "milk"]
      },
      {
        id: "corn-salad",
        name: { ar: "سلطة ذرة", en: "Sweet Corn Salad" },
        desc: {
          ar: "حبات الذرة الحلوة مع الخضار المقرمشة والأعشاب والصلصة الكريمية بالليمون",
          en: "Sweet golden corn kernels tossed with crisp garden vegetables and creamy citrus herb dressing"
        },
        price: 40,
        calories: 510,
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "chicken-broccoli-salad",
        name: { ar: "دجاج بالبروكلي", en: "Chicken Broccoli Salad" },
        desc: {
          ar: "قطع صدر الدجاج المشوي مع زهرات البروكلي الطازجة والذرة والصلصة الخاصة",
          en: "Chargrilled chicken breast strips served over crisp broccoli florets and house dressing"
        },
        price: 44,
        calories: 590,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "baba-ghanouj",
        name: { ar: "بابا غنوج", en: "Baba Ghanouj" },
        desc: {
          ar: "باذنجان مشوي على الحطب مع الفليفلة الملونة والطماطم والرمان والجوز ودبس الرمان",
          en: "Fire-roasted eggplant tossed with bell peppers, tomatoes, walnuts, and pomegranate molasses"
        },
        price: 35,
        calories: 220,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts"]
      }
    ]
  },

  // =========================================================================
  // 5. المشاوي | Charcoal Grills (6 Dishes)
  // =========================================================================
  {
    id: "grills",
    order: 5,
    name: { ar: "المشاوي", en: "Charcoal Grills" },
    subtitle: { ar: "مشويات عراقية أصيلة على الفحم الحي", en: "Authentic Iraqi skewers grilled over live charcoal" },
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "iraqi-kebab",
        name: { ar: "كباب عراقي", en: "Iraqi Kebab" },
        desc: {
          ar: "لحم غنم طازج مفروم يدوياً بالدهن الحر مشوي على الفحم مع الطماطم والبصل والسماق",
          en: "Hand-minced Iraqi lamb kebab grilled over glowing embers with charred tomatoes, sumac, and tannour bread"
        },
        price: 71,
        calories: 999,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "lamb-tikka",
        name: { ar: "تكة لحم", en: "Lamb Tikka" },
        desc: {
          ar: "أوصال لحم الغنم الطري المتبلة بالبهارات العراقية والمشوية على الفحم",
          en: "Succulent cubes of marinated prime lamb tenderloin flame-grilled over charcoal"
        },
        price: 82,
        calories: 892,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "boneless-grilled-chicken",
        name: { ar: "دجاج مسحب مشوي على الفحم", en: "Boneless Charcoal Grilled Chicken" },
        desc: {
          ar: "دجاج مسحب متبل بالأعشاب والليمون مشوي على الفحم يقدم مع البطاطس والثومية",
          en: "Charcoal-grilled marinated boneless chicken served with crispy fries and garlic toum"
        },
        price: 69,
        calories: 863,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "wheat"]
      },
      {
        id: "meat-arayes",
        name: { ar: "عرايس لحم", en: "Meat Arayes" },
        desc: {
          ar: "خبز تنور محمص على الفحم ومحشو بلحم الغنم المتبل والطماطم والبقدونس",
          en: "Charcoal-toasted flatbread stuffed with seasoned minced lamb, herbs, and spices"
        },
        price: 55,
        calories: 814,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk"]
      },
      {
        id: "chicken-tikka",
        name: { ar: "تكة دجاج", en: "Chicken Tikka" },
        desc: {
          ar: "قطع صدر الدجاج المتبلة باللبن والثوم والليمون والمشوية على الجمر",
          en: "Tender chicken breast cubes marinated in yogurt, garlic, and citrus, grilled over charcoal"
        },
        price: 72,
        calories: 863,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "wheat"]
      },
      {
        id: "grilled-lamb-chops",
        name: { ar: "ريش مشوية", en: "Grilled Lamb Chops" },
        desc: {
          ar: "ريش غنم بلدي طرية متبلة ومشوية على الفحم تقدم مع الخضار المشوية والبطاطس",
          en: "Prime tender lamb cutlets flame-grilled over charcoal, served with roasted vegetables"
        },
        price: 105,
        calories: 1330,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      }
    ]
  },

  // =========================================================================
  // 6. الأطباق الرئيسية | Main Courses (8 Dishes)
  // =========================================================================
  {
    id: "mains",
    order: 6,
    name: { ar: "الأطباق الرئيسية", en: "Main Courses" },
    subtitle: { ar: "المسكوف العراقي، القوزي، البرياني، والتبسي البغدادي", en: "Signature Iraqi Masgouf, Lamb Quzi, Biryani & Casseroles" },
    thumbnail: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "masgouf",
        name: { ar: "مسكوف", en: "Iraqi Masgouf" },
        desc: {
          ar: "سمك نهري طازج مشوي على حطب المشمش على الطريقة البغدادية يقدم مع الطرشي والخبز الحار",
          en: "Fresh river carp slow-roasted beside an open apricot-wood fire, served with torshi pickles and hot tannour bread"
        },
        price: 165,
        calories: 1840,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat"]
      },
      {
        id: "lamb-quzi",
        name: { ar: "قوزي لحم", en: "Lamb Quzi" },
        desc: {
          ar: "موزة غنم مطهوة ببطء تقدم فوق التمن العراقي بالشعيرية والمكسرات مع المرق",
          en: "Slow-braised tender lamb shank served over aromatic Iraqi rice with vermicelli, toasted nuts, and stew"
        },
        price: 97,
        calories: 1270,
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat", "milk"]
      },
      {
        id: "chicken-biryani",
        name: { ar: "برياني دجاج", en: "Chicken Biryani" },
        desc: {
          ar: "دجاج متبل بالبهارات العراقية يقدم مع أرز البرياني والشعيرية والزبيب واللوز",
          en: "Iraqi-spiced roasted chicken over fragrant biryani rice with vermicelli, golden raisins, and almonds"
        },
        price: 74,
        calories: 1140,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat"]
      },
      {
        id: "lamb-biryani",
        name: { ar: "برياني لحم", en: "Lamb Biryani" },
        desc: {
          ar: "قطع لحم الغنم المطهوة ببطء على أرز البرياني العراقي المتبل بالشعيرية والمكسرات",
          en: "Slow-cooked tender lamb served over spiced Iraqi biryani rice crowned with toasted nuts and raisins"
        },
        price: 87,
        calories: 1240,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat"]
      },
      {
        id: "maqluba-lamb-eggplant",
        name: { ar: "مقلوبة لحم باذنجان", en: "Eggplant Lamb Maqluba" },
        desc: {
          ar: "لحم غنم طري مطهو مع طبقات الباذنجان المقلي والأرز المبهر والمكسرات، يقدم مع اللبن",
          en: "Tender lamb layered with caramelized eggplant and spiced rice, inverted and garnished with toasted nuts"
        },
        price: 89,
        calories: 1320,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "milk"]
      },
      {
        id: "eggplant-tepsi",
        name: { ar: "تبسي باذنجان", en: "Eggplant Tepsi" },
        desc: {
          ar: "شرائح الباذنجان والبطاطس والطماطم والفلفل المخبوزة بالفرن بصلصة الطماطم العراقية",
          en: "Traditional Baghdadi oven-baked casserole of layered eggplant, potatoes, peppers, and rich tomato sauce"
        },
        price: 68,
        calories: 780,
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "white-bean-stew",
        name: { ar: "مرق فاصوليا", en: "White Bean Stew" },
        desc: {
          ar: "فاصوليا بيضاء مطهوة ببطء في صلصة الطماطم الغنية مع قطع لحم الغنم الطرية",
          en: "Slow-simmered white beans in rich Iraqi tomato broth with tender lamb cubes"
        },
        price: 49,
        calories: 450,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "oven-meat-tepsi",
        name: { ar: "تبسي لحم بالفرن", en: "Oven-Baked Meat Tepsi" },
        desc: {
          ar: "قطع لحم الغنم المخبوزة في الفرن مع البصل والطماطم والبطاطس والبهارات العراقية",
          en: "Succulent lamb baked in the oven with tomatoes, onions, potatoes, and traditional Iraqi spices"
        },
        price: 68,
        calories: 831,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      }
    ]
  },

  // =========================================================================
  // 7. أطباق الولائم | Feast Platters (2 Dishes)
  // =========================================================================
  {
    id: "feasts",
    order: 7,
    name: { ar: "أطباق الولائم", en: "Feast Platters" },
    subtitle: { ar: "صواني ومناسف ملكية للجمعات والضيافة", en: "Grand royal banquet platters for sharing" },
    thumbnail: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "aghatti-mixed-grill-platter",
        name: { ar: "صحن مشاوى أغاتي", en: "Aghatti Mixed Grill Platter" },
        desc: {
          ar: "وليمة فاخرة من الكباب العراقي وتكة اللحم وتكة الدجاج والريش المشوية على الفحم مع المقبلات والخبز الحار",
          en: "Grand charcoal grill platter featuring Iraqi kebab, lamb tikka, chicken tikka, and lamb chops with sides and hot bread"
        },
        price: 235,
        calories: 3280,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk"]
      },
      {
        id: "whole-lamb-feast",
        name: { ar: "الخروف", en: "Whole Roasted Lamb Feast" },
        desc: {
          ar: "قوزي خروف كامل مطهو ببطء على الطريقة العراقية الملكية يقدم على تمن العنبر والمكسرات والزبيب والمرق",
          en: "Whole slow-roasted royal Iraqi lamb Quzi served over fragrant amber rice, toasted nuts, golden raisins, and stews"
        },
        price: 2600,
        calories: 18500,
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat", "milk"]
      }
    ]
  },

  // =========================================================================
  // 8. الأطباق الجانبية | Sides (4 Dishes)
  // =========================================================================
  {
    id: "sides",
    order: 8,
    name: { ar: "الأطباق الجانبية", en: "Sides" },
    subtitle: { ar: "تمن عراقي أصيل ومرافقات شهية", en: "Traditional Iraqi rice specialties & crispy sides" },
    thumbnail: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "taman-baqilla",
        name: { ar: "تمن باقيلاء", en: "Dill & Fava Bean Rice" },
        desc: {
          ar: "تمن عراقي مطهو مع الباقيلاء الخضراء والشبنت الطازج والدهن الحر",
          en: "Aromatic Iraqi rice steamed with green fava beans, fresh dill, and clarified ghee"
        },
        price: 28,
        calories: 451,
        image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "taman-biryani",
        name: { ar: "تمن برياني", en: "Biryani Rice" },
        desc: {
          ar: "أرز برياني عراقي مبهر بالهيل والقرفة مع الشعيرية والمكسرات والزبيب",
          en: "Spiced Iraqi biryani rice tossed with toasted vermicelli, almonds, and golden raisins"
        },
        price: 28,
        calories: 468,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=90",
        allergens: ["nuts", "wheat"]
      },
      {
        id: "taman-white",
        name: { ar: "تمن أبيض", en: "White Amber Rice" },
        desc: {
          ar: "تمن عنبر عراقي أبيض فاخر مطهو على البخار برائحته الزكية المميزة",
          en: "Steamed fragrant Iraqi Mishkhab white amber rice"
        },
        price: 15,
        calories: 290,
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "french-fries",
        name: { ar: "بطاطا مقلية", en: "French Fries" },
        desc: {
          ar: "أصابع البطاطس الذهبية المقرمشة المملحة",
          en: "Golden crispy french fries lightly seasoned with sea salt"
        },
        price: 16,
        calories: 410,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      }
    ]
  },

  // =========================================================================
  // 9. الحلويات | Desserts (6 Dishes)
  // =========================================================================
  {
    id: "desserts",
    order: 9,
    name: { ar: "الحلويات", en: "Desserts" },
    subtitle: { ar: "حلويات أغاتي الفاخرة بالقشطة والفستق الحلبي", en: "Signature Iraqi & oriental desserts with clotted cream" },
    thumbnail: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "kunafa-tray",
        name: { ar: "كنافة في الصينية", en: "Kunafa in Tray" },
        desc: {
          ar: "كنافة ذهبية مقرمشة مخبوزة في الصينية ومحشوة بالقشطة البلدي والفستق الحلبي والقطر",
          en: "Oven-baked golden kunafa in a tray layered with rich cream, crushed pistachios, and rose syrup"
        },
        price: 39,
        calories: 690,
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk", "nuts"]
      },
      {
        id: "umm-ali",
        name: { ar: "أم علي", en: "Umm Ali" },
        desc: {
          ar: "رقائق العجين المخبوزة بالحليب الدافئ والقشطة والمكسرات المحمصة والزبيب",
          en: "Warm baked puff pastry soaked in sweet milk, clotted cream, and roasted nuts"
        },
        price: 39,
        calories: 600,
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk", "nuts"]
      },
      {
        id: "aish-al-saraya",
        name: { ar: "عيش السرايا", en: "Aish Al-Saraya" },
        desc: {
          ar: "خبز السرايا المكرمل بماء الورد والقطر يعلوه القشطة الطازجة والفستق الحلبي",
          en: "Caramelized blossom-syrup bread base topped with velvety clotted cream and pistachios"
        },
        price: 35,
        calories: 466,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk", "nuts"]
      },
      {
        id: "ghazalia",
        name: { ar: "غزلية", en: "Ghazalia" },
        desc: {
          ar: "قشطة أغاتي الغنية مع الكريمة وتقدم مع غزل البنات الهش وصلصة الباشن فروت والفستق",
          en: "Rich clotted cream and whipped cream crowned with spun cotton candy and passion fruit"
        },
        price: 35,
        calories: 547,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "nuts"]
      },
      {
        id: "aghatti-madkouka",
        name: { ar: "مدكوكة أغاتي", en: "Aghatti Madkouka" },
        desc: {
          ar: "خليط التمر العراقي والجوز والسمسم المحمص بالهيل والمحشو بقشطة أغاتي الفاخرة",
          en: "Traditional Iraqi date paste kneaded with toasted sesame, walnuts, and cardamom, stuffed with Aghatti clotted cream"
        },
        price: 35,
        calories: 564,
        image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk", "nuts", "sesame"]
      },
      {
        id: "othmalieh",
        name: { ar: "عثملية", en: "Othmalieh" },
        desc: {
          ar: "طبقتان من عجينة الكنافة المحمصة المقرمشة محشوة بقشطة أغاتي الطازجة والفستق",
          en: "Crispy spun kunafa layers filled with fresh Aghatti clotted cream and pistachios"
        },
        price: 35,
        calories: 200,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=90",
        allergens: ["wheat", "milk", "nuts"]
      }
    ]
  },

  // =========================================================================
  // 10. المشروبات والقهوة | Beverages & Coffee (23 Dishes)
  // =========================================================================
  {
    id: "beverages",
    order: 10,
    name: { ar: "المشروبات والقهوة", en: "Beverages & Coffee" },
    subtitle: { ar: "عصائر طبيعية، موكتيلات، مياه إيطالية، قهوة مختصة وشاي عراقي", en: "Fresh juices, mocktails, sparkling waters, coffee & Iraqi tea" },
    thumbnail: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=90",
    items: [
      {
        id: "carrot-juice",
        name: { ar: "عصير جزر", en: "Fresh Carrot Juice" },
        desc: { ar: "عصير جزر طبيعي طازج يحضر عند الطلب", en: "100% freshly pressed sweet carrot juice" },
        price: 16,
        calories: 165,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "green-apple-juice",
        name: { ar: "تفاح أخضر", en: "Green Apple Juice" },
        desc: { ar: "عصير تفاح أخضر طازج ومنعش", en: "Crisp cold-pressed green apple juice" },
        price: 22,
        calories: 181,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "mixed-berry-mocktail",
        name: { ar: "موكتيل توت مشكل", en: "Mixed Berry Mocktail" },
        desc: { ar: "مزيج منعش من التوت البري والأحمر والأسود مع النعناع والليمون", en: "Refreshing blend of wild berries, fresh mint, and lime" },
        price: 32,
        calories: 358,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "blue-lagoon",
        name: { ar: "بلو لاجون", en: "Blue Lagoon" },
        desc: { ar: "موكتيل أغاتي التركوازي المنعش بالليمون والنعناع الطازج", en: "Signature turquoise citrus mocktail with lime and fresh mint" },
        price: 30,
        calories: 412,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "mango-smoothie",
        name: { ar: "سموذي مانجو", en: "Mango Smoothie" },
        desc: { ar: "سموذي مانجو استوائي غني ومثلج", en: "Rich tropical ripe mango smoothie blended with ice" },
        price: 30,
        calories: 240,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "lemon-pomegranate",
        name: { ar: "ليمون ورمان", en: "Lemon & Pomegranate" },
        desc: { ar: "مزيج منعش من الليمون الطازج وعصير وحبات الرمان", en: "Zesty fresh lemon juice layered with ruby pomegranate" },
        price: 32,
        calories: 195,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "lemon-mint",
        name: { ar: "ليمون نعناع", en: "Lemon Mint" },
        desc: { ar: "عصير ليمون طازج مضروب مع أوراق النعناع الأخضر والثلج", en: "Freshly squeezed lemon blended with garden mint over crushed ice" },
        price: 25,
        calories: 170,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "perfect-pineapple-mint",
        name: { ar: "برفكت أناناس نعناع", en: "Perfect Pineapple Mint" },
        desc: { ar: "أناناس طازج معصور مع أوراق النعناع المنعشة", en: "Sweet golden pineapple pressed with fresh mint leaves" },
        price: 30,
        calories: 145,
        image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "passion-fruit",
        name: { ar: "باشن فروت", en: "Passion Fruit Mocktail" },
        desc: { ar: "موكتيل فاكهة الباشن فروت الاستوائية مع الليمون والنعناع", en: "Exotic passion fruit mocktail with lime and fresh mint" },
        price: 35,
        calories: 190,
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "soft-drinks",
        name: { ar: "مشروبات غازية", en: "Soft Drinks" },
        desc: { ar: "تشكيلة مشروبات غازية مثلجة", en: "Assorted chilled carbonated soft drinks" },
        price: 12,
        calories: 140,
        image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "sparkling-water-250",
        name: { ar: "مياه فوارة 250 مل", en: "Sparkling Water 250ml" },
        desc: { ar: "مياه معدنية غازية فوارة ومنعشة (250 مل)", en: "Chilled natural sparkling mineral water (250ml)" },
        price: 15,
        calories: 0,
        image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "san-pellegrino-lemon-250",
        name: { ar: "سان بيليغرينو ليمون 250 مل", en: "San Pellegrino Lemon 250ml" },
        desc: { ar: "مشروب سان بيليغرينو الإيطالي الفوار بنكهة الليمون الطبيعي (250 مل)", en: "Italian sparkling lemon beverage by San Pellegrino (250ml)" },
        price: 22,
        calories: 130,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "san-pellegrino-pomegranate-250",
        name: { ar: "سان بيليغرينو رمان 250 مل", en: "San Pellegrino Pomegranate 250ml" },
        desc: { ar: "مشروب سان بيليغرينو الإيطالي الفوار بنكهة الرمان (250 مل)", en: "Italian sparkling pomegranate beverage by San Pellegrino (250ml)" },
        price: 22,
        calories: 135,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "mineral-water-330",
        name: { ar: "مياه معدنية 330 مل", en: "Mineral Water 330ml" },
        desc: { ar: "مياه معدنية نقية (330 مل)", en: "Pure natural mineral water (330ml)" },
        price: 8,
        calories: 0,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "mineral-water-750",
        name: { ar: "مياه معدنية 750 مل", en: "Mineral Water 750ml" },
        desc: { ar: "مياه معدنية نقية حجم كبير (750 مل)", en: "Large pure natural mineral water (750ml)" },
        price: 14,
        calories: 0,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "single-espresso",
        name: { ar: "إسبريسو سينجل", en: "Single Espresso" },
        desc: { ar: "جرعة غنية من قهوة الإسبريسو المختصة", en: "Rich single shot of specialty Arabica espresso" },
        price: 9,
        calories: 20,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "double-espresso",
        name: { ar: "إسبريسو دبل", en: "Double Espresso" },
        desc: { ar: "جرعة مزدوجة مركزة من الإسبريسو الفاخر", en: "Bold double shot of specialty espresso with golden crema" },
        price: 14,
        calories: 40,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "americano",
        name: { ar: "أمريكانو", en: "Americano" },
        desc: { ar: "إسبريسو مزدوج مخفف بالماء الساخن", en: "Smooth double espresso lengthened with hot water" },
        price: 20,
        calories: 40,
        image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "cappuccino",
        name: { ar: "كابتشينو", en: "Cappuccino" },
        desc: { ar: "إسبريسو غني مع حليب مبخر ورغوة كثيفة", en: "Classic espresso balanced with steamed milk and velvety foam" },
        price: 23,
        calories: 140,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "cafe-latte",
        name: { ar: "كافيه لاتيه", en: "Cafe Latte" },
        desc: { ar: "إسبريسو ناعم ممزوج بالحليب المبخر الكريمي", en: "Silky steamed milk poured over specialty espresso" },
        price: 23,
        calories: 190,
        image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=1200&q=90",
        allergens: ["milk"]
      },
      {
        id: "turkish-coffee",
        name: { ar: "قهوة تركي", en: "Turkish Coffee" },
        desc: { ar: "قهوة تركية مطحونة ناعماً ومحضرة على نار هادئة بوجه غني", en: "Finely ground traditional Turkish coffee slow-brewed with rich foam" },
        price: 18,
        calories: 20,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "iraqi-tea",
        name: { ar: "شاي عراقي", en: "Iraqi Cardamom Tea" },
        desc: { ar: "شاي عراقي أسود مخدر على الفحم ومهيل بالهيل الأصلي يقدم في استكان", en: "Charcoal-steeped Iraqi black tea infused with cardamom, served in an istikan" },
        price: 13,
        calories: 5,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      },
      {
        id: "green-tea-mint",
        name: { ar: "شاي أخضر بالنعناع", en: "Green Tea with Mint" },
        desc: { ar: "شاي أخضر طبيعي مع أوراق النعناع الطازجة", en: "Refreshing whole-leaf green tea steeped with fresh mint" },
        price: 13,
        calories: 2,
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=90",
        allergens: []
      }
    ]
  }
];

export const MENU_CATEGORIES = MENU_DATA;
export const TOTAL_MENU_ITEMS = MENU_DATA.reduce((sum, cat) => sum + cat.items.length, 0);
