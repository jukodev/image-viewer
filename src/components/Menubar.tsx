import {
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	MenubarShortcut,
	Menubar as MB,
} from "./ui/menubar";

const Menubar = () => {
	return (
		<MB className="absolute top-0 left-0">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New Tab <MenubarShortcut>STRG+T</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>New Window</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Share</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Print</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Reset Zoom</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Convert</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>To PNG</MenubarItem>
					<MenubarItem>To JPEG</MenubarItem>
					<MenubarItem>To WEBP</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Folder to PNG</MenubarItem>
					<MenubarItem>Folder to JPEG</MenubarItem>
					<MenubarItem>Folder to WEBP</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Options</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Preferences{" "}
						<MenubarShortcut>STRG+ALT+P</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</MB>
	);
};

export { Menubar };
