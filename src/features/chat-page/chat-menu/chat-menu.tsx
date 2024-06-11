import { sortByTimestamp } from "@/features/common/util";
import {
  ChatThreadModel,
  MenuItemsGroup,
  MenuItemsGroupName,
} from "../chat-services/models";
import { ChatGroup } from "./chat-group";
import { ChatMenuItem } from "./chat-menu-item";
import { TFunction } from 'i18next';
import initTranslations from '@/app/i18n';

interface ChatMenuProps {
  locale: 'de' | 'en';
  menuItems: Array<ChatThreadModel>;
}

export async function ChatMenu(props: ChatMenuProps) {
  const { t } = await initTranslations(props.locale, ['chat']);
  const menuItemsGrouped = GroupChatThreadByType(props.menuItems, t);
  return (
    <div className="px-3 flex flex-col gap-8 overflow-hidden">
      {Object.entries(menuItemsGrouped).map(
        ([groupName, groupItems], index) => (
          <ChatGroup key={index} numOfItems={groupItems?.length || 0} title={groupName}>
            {groupItems?.map((item) => (
              <ChatMenuItem
                key={item.id}
                href={`/chat/${item.id}`}
                chatThread={item}
              >
                {item.name.replace("\n", "")}
              </ChatMenuItem>
            ))}
          </ChatGroup>
        )
      )}
    </div>
  );
};

export const GroupChatThreadByType = (menuItems: Array<ChatThreadModel>, t: TFunction<"translation", undefined>) => {
  const groupedMenuItems: Array<MenuItemsGroup> = [];

  // todays date
  const today = new Date();
  // 7 days ago
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const favoritesLabel = t("favourites");
  const pastSevenDaysLabel = t("pastSevenDays");
  const previousLabel = t("previous");

  menuItems.sort(sortByTimestamp).forEach((el) => {
    if (el.bookmarked) {
      groupedMenuItems.push({
        ...el,
        groupName: favoritesLabel,
      });
    } else if (new Date(el.lastMessageAt) > sevenDaysAgo) {
      groupedMenuItems.push({
        ...el,
        groupName: pastSevenDaysLabel,
      });
    } else {
      groupedMenuItems.push({
        ...el,
        groupName: previousLabel,
      });
    }
  });
  const menuItemsGrouped = groupedMenuItems.reduce((acc, el) => {
    const key = el.groupName;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(el);
    return acc;
  }, {} as Record<MenuItemsGroupName, Array<MenuItemsGroup>>);

  const records: Record<MenuItemsGroupName, Array<MenuItemsGroup>> = {
    [favoritesLabel]: menuItemsGrouped[favoritesLabel]?.sort(sortByTimestamp),
    [pastSevenDaysLabel]: menuItemsGrouped[pastSevenDaysLabel]?.sort(sortByTimestamp),
    [previousLabel]: menuItemsGrouped[previousLabel]?.sort(sortByTimestamp),
  };

  return records;
};
