**！总结自**[fabric wiki:item](https://wiki.fabricmc.net/zh_cn:tutorial:items)和[fabric文档](https://docs.fabricmc.net/zh_cn/1.21/develop/items/first-item)
# 创建第一个物品
## 1.注册物品
```java
public static final Item FIRST_ITEM = register(
            new Item(new Item.Settings()),
            "first_item"
    );
```
- ### 说明：
  - 1\. **FIRST_ITEM** 是物品的声明名称，“ ”中first_item是物品的默认名称(此时是item.docs.first_item)
  - 2\.物品的构造方法会接收一个 **Items.Settings** 类的实例作为参数.这个类允许你通过一系列构造器方法配置物品的属性。Item.Settings用法见[fabric wiki](https://wiki.fabricmc.net/zh_cn:tutorial:items_docs)

**此时物品已创建完成，要想让它在创造模式物品栏中出现，还需继续注册**
<br><br>
## 2.将物品添加到物品组
```java
ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
    .register((ItemGroup) -> ItemGroup.add(ModItems.FIRST_ITEM));
```
- ### 说明：
  - 1\. **ItemGroups.INGREDIENTS** 指 **材料** 栏，除此之外，还有：

| 字段 | 组 |
|:-------:|:-------:|
| BUILD_BLOCKS | 建筑方块  |
| COLORED_BLOCKS | 装饰方块 |
| INGREDIENTS | 原材料 |
| COMBAT | 战斗用品 |
| TOOLS | 工具 |
| HOTBAR |快捷栏|
| FOOD_AND_DRINK | 食物与饮品 |
| FUNCTIONAL | 功能方块 |
| INVENTORY | 生存模式物品栏 |
| NATURAL | 自然方块 |
| OPERATOR | 管理员方块 |
| REDSTONE | 红石 |
| SEARCH | 搜索栏 |
| SPAWN_EGGS | 刷怪蛋 |

现在，物品已经出现在了**原材料**一栏中，还差它的**翻译、材质**以及**模型**
<br><br>
## 3.创建翻译
<br><br>
在 **srcmainresources/assets/mod-id/lang/** 中创建 **zh_cn.json(简体中文)** 或者 **en_us.json(英语)**，输入：
```json
{
  "item.docs.first_item": "My First Item"
}
```
- ### 说明：
  - **docs**是**mod_id**，随自己模组改变
  - **first_item**是物品的注册名称，” “中的是物品的翻译。当然，也可以是：
```json
{
  "item.docs.first_item": "第一个物品"
}
```
## 4.添加纹理和模型
>要给你的物品纹理和模型，先简单地为物品创建一个16x16的纹理图像，并存储在 assets/mod-id/textures/item 文件夹中。 根据物品的 id 命名纹理文件的名字，但要有 .png 扩展名。

<img src="../../../../image/first_item.png" width="128" height="128">

[下载](../../../../image/first_item.png)

再创建”assets/docs/item/generated“,然后不需要做任何操作
<br><br>
>在 assets/mod-id/models/item 文件夹内创建模型 JSON，名称与物品相同，

**first_item.json**
```json
{
  "parent": "item/generated",
  "textures": {
    "layer0": "docs:item/first_item"
  }
}
```
- ### 逐个分析模型 JSON
  - **parent**：模型要继承的模型。 在这个例子中，是 item/generated 模型。
  - **textures**：为模型定义纹理的地方。 layer0 键是模型使用的纹理。
  - 大多物品继承的模型是 **item/generate**，因为这是显示纹理的简单模型。
  - 也有其他的，比如 **item/handheld**，用于拿在玩家手中的物品，例如工具。

---
## 完整代码
**item.java**
```java
package com.example.docs.item;

import com.example.docs.docs;
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroups;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModItems {

    public static final Item FIRST_ITEM = register(
            new Item(new Item.Settings()),
            "first_item"
    );

    public static Item register(Item item, String id) {
        // Create the identifier for the item.
        Identifier itemID = Identifier.of(docs.MOD_ID, id);

        // Register the item.
        //Item registeredItem = Registry.register(Registries.ITEM, itemID, item);

        // Return the registered item!
        return Registry.register(Registries.ITEM, itemID, item);
    }
    public static void initialize() {

        // Get the event for modifying entries in the ingredients group.
// And register an event handler that adds our suspicious item to the ingredients group.
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
                .register((ItemGroup) -> ItemGroup.add(ModItems.FIRST_ITEM));
    }
}
```