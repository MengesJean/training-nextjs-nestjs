"use client";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navigationsItems = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Clients',
        href: '/clients',
        description: "Manage your clients"
    },
    {
        label: 'Contacts',
        href: '/contacts',
        description: "Manage your contacts"
    }
];

const Header = () => {
    const pathname = usePathname();
    return (
        <div className="shadow">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex justify-between items-center">
                    <Link href={"/"} className="text-2xl font-bold">Compta.IO</Link>
                    <Sheet>
                        <Button asChild={true}>
                            <SheetTrigger>
                                Menu
                            </SheetTrigger>
                        </Button>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="py-6">
                                <ul className="">
                                    {navigationsItems.map((item, index) => (
                                        <li key={index}>
                                            <SheetClose asChild={true}>
                                                <Link href={item.href} className={cn(
                                                    'group hover:bg-gray-500/10 block p-4 rounded',
                                                    pathname === item.href ? 'text-primary' : ''
                                                )}>
                                                    <p className="group-hover:text-primary transition">{item.label}</p>
                                                    {!!item.description && <span className="text-muted-foreground">{item.description}</span>}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default Header;