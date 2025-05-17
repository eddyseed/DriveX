import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { ArrowUpFromLine, Save, RotateCcw, Printer, EyeClosed, CrossIcon, X, Undo, Redo, CopyIcon, ClipboardIcon, ScissorsIcon, ArrowUp, ArrowDown, Search, Globe, HeadsetIcon, DollarSignIcon, Code2Icon, EyeIcon, ChevronRightIcon, ChevronLeftIcon, ExpandIcon } from 'lucide-react';

const Menu: React.FC = () => {
  return (
    <Menubar className="bg-transparent text-white border-none">
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <CrossIcon />
            </i>
            New File
          </span>
          <MenubarShortcut>Alt + N</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ArrowUpFromLine />
            </i>
            Open...
          </span>
          <MenubarShortcut>Alt + O</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">

            </i>
            Open Recent
          </span>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Save />
            </i>
            Save
          </span>
          <MenubarShortcut>Alt + S</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              {/* <LucideIcon name="SaveAs" /> */}
            </i>
            Save As
          </span>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              {/* <LucideIcon name="SaveAll" /> */}
            </i>
            Save All
          </span>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <RotateCcw />
            </i>
            Reload
          </span>
          <MenubarShortcut>Alt + R</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Printer />
            </i>
            Print...
          </span>
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>
            <span className="flex items-center">
              Download
            </span>
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Download as PDF</MenubarItem>
            <MenubarItem>Download as DOCX</MenubarItem>
            <MenubarItem>Download as TXT</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <X />
            </i>
            Close Tab
          </span>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <EyeClosed />
            </i>
            Save and Quit
          </span>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Undo />
            </i>
            Undo
          </span>
          <MenubarShortcut>Ctrl + Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Redo />
            </i>
            Redo
          </span>
          <MenubarShortcut>Ctrl + Y</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ScissorsIcon />
            </i>
            Cut
          </span>
          <MenubarShortcut>Ctrl + X</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <CopyIcon />
            </i>
            Copy
          </span>
          <MenubarShortcut>Ctrl + C</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ClipboardIcon />
            </i>
            Paste
          </span>
          <MenubarShortcut>Ctrl + V</MenubarShortcut>
        </MenubarItem>

      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Find</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Globe />
            </i>
            Search the Web
          </span>
          <MenubarShortcut>Ctrl + E</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Search />
            </i>
            Find...
          </span>
          <MenubarShortcut>Ctrl + F</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ArrowDown />
            </i>
            Find Next
          </span>
          <MenubarShortcut>F3</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ArrowUp />
            </i>
            Find Previous
          </span>
          <MenubarShortcut>Shift + F3</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>
            Select Font
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Arial</MenubarItem>
            <MenubarItem>Courier New</MenubarItem>
            <MenubarItem>Times New Roman</MenubarItem>
            <MenubarItem>Verdana</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSub>
          <MenubarSubTrigger>
            Select Theme
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>System Default</MenubarItem>
            <MenubarItem>Light</MenubarItem>
            <MenubarItem>Dark</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Atomic</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarCheckboxItem checked>
          <span className="flex items-center">
            Menubar
          </span>
        </MenubarCheckboxItem>
        <MenubarCheckboxItem checked>
          <span className="flex items-center">
            Toolbar
          </span>
        </MenubarCheckboxItem>
        <MenubarCheckboxItem checked>
          <span className="flex items-center">
            Sidebar
          </span>
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ExpandIcon />
            </i>
            Fullscreen
          </span>
          <MenubarShortcut>F11</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Document</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem checked>
          <span className="flex items-center">
            Word Wrap
          </span>
        </MenubarCheckboxItem>
        <MenubarCheckboxItem>
          <span className="flex items-center">
            Auto Indent
          </span>
        </MenubarCheckboxItem>
        <MenubarSub>
          <MenubarSubTrigger>
            Tab Size
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarRadioGroup value="4">
              <MenubarRadioItem value="2">2</MenubarRadioItem>
              <MenubarRadioItem value="4">4</MenubarRadioItem>
              <MenubarRadioItem value="6">6</MenubarRadioItem>
              <MenubarRadioItem value="8">8</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>
            File Type
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Categories</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSub>
          <MenubarSubTrigger>
            Line Ending
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Unix</MenubarItem>
            <MenubarItem>Mac</MenubarItem>
            <MenubarItem>Dos</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            Write Unicode BOM
          </span>
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>
            Insert TimeStamp
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Insert Time</MenubarItem>
            <MenubarItem>Insert Date</MenubarItem>
            <MenubarItem>Insert Date Unix Key</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <EyeIcon />
            </i>
            Viewer Mode
          </span>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ChevronLeftIcon />

            </i>
            Previous Tab
          </span>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <ChevronRightIcon />
            </i>
            Next Tab
          </span>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            Opened Tab List
          </span>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <HeadsetIcon />
            </i>
            Contact
          </span>
        </MenubarItem>
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <DollarSignIcon />
            </i>
            Donate
          </span>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <span className="flex items-center">
            <i className="mr-2">
              <Code2Icon />
            </i>
            Contribute
          </span>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
  );
};

export default Menu;