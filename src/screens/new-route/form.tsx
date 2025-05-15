import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const FormSchema = z.object({
  category: z.string({ required_error: "Selecione a categoria" }),
  name: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  manufacturer: z.string({ required_error: "Selecione o fabricante" }),
  inventory: z.string({ required_error: "Inventário" }),
  shelf: z.string().optional(),
  minimal: z.string().min(1, { message: "Mínimo 1 caracteres" }),
  barcode: z.string().optional(),
  sku: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  buy_value: z
    .string()
    .optional()
    .transform((value) => (value ? parseFloat(value) : null)),
  sale_value: z
    .string()
    .optional()
    .transform((value) => (value ? parseFloat(value) : null)),
});

export function NewRouteForm() {


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        const payload = {
            ...data,
            buy_value: data.buy_value ?? null, 
            sale_value: data.sale_value ?? null,
        };

        console.log("Payload ajustado:", payload);

        const response = await ApiProduct.Insert({ data: payload });
        console.log("Resposta da API:", response);
        if (response === 201) {
            navigate('/products');
        }
    } catch (error) {
        console.log("Erro ao enviar dados:", error);
    }
  }

  const getCategories = async () => {
    const response = await ApiCategory.GetAllCategories();
    setCategories(response);
  };

  const getManufacturers = async () => {
    const response = await ApiManufacturer.GetAllManufacturers();
    setManufacturers(response);
  };

  useEffect(() => {
    getCategories();
    getManufacturers();
  }, []);

  return (
    <>
      <AppSidebar />
      <SidebarInset className="pl-9">
        <header className="flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>
                    <Link to="/products">Produtos</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Adicionar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="pr-8">
            <ToggleTheme />
          </div>
        </header>
        <div className="flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3">
          <div className="col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="flex items-center">

                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-1">
                          <FormLabel>Categoria</FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? categories.find(
                                      (category) =>
                                        category.name === field.value
                                    )?.name
                                  : "Selecione a categoria"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Buscar categoria" />
                                <CommandList>
                                  <CommandEmpty>Não encontrada</CommandEmpty>
                                  <CommandGroup>
                                    {categories.map((category) => (
                                      <CommandItem
                                        key={category.name}
                                        onSelect={() => {
                                          form.setValue(
                                            "category",
                                            category.name
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        {category.name}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value === category.name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Produto</FormLabel>
                          <Input placeholder="Nome do produto" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2 ">
                    <FormField
                      control={form.control}
                      name="manufacturer"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-1">
                          <FormLabel>Fornecedor</FormLabel>
                          <Popover open={openManufacturer} onOpenChange={setOpenManufacturer}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openManufacturer}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? manufacturers.find(
                                      (manufacturer) =>
                                        manufacturer.name === field.value
                                    )?.name
                                  : "Selecione o fornecedor"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Buscar fornecedor" />
                                <CommandList>
                                  <CommandEmpty>Não encontrado</CommandEmpty>
                                  <CommandGroup>
                                    {manufacturers.map((manufacturer) => (
                                      <CommandItem
                                        key={manufacturer.name}
                                        onSelect={() => {
                                          form.setValue(
                                            "manufacturer",
                                            manufacturer.name
                                          );
                                          setOpenManufacturer(false);
                                        }}
                                      >
                                        {manufacturer.name}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value === manufacturer.name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                </div>

                <div className="flex items-center mt-5">
                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="minimal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade Mínima </FormLabel>
                          <Input
                            placeholder="Quantidade mínima em estoque"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="inventory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inventariar?</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Deve ser inventariada?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem key="0" value="False">
                                Não
                              </SelectItem>
                              <SelectItem key="1" value="True">
                                Sim
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="shelf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prateleira (Opcional)</FormLabel>
                          <Input placeholder="Lugar na prateleira" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> 

                </div>
                

                <div className="flex items-center mt-5">
                
                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código</FormLabel>
                          <Input placeholder="Código do produto" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="buy_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor de Compra (Opcional)</FormLabel>
                          <Input
                            placeholder="Valor de compra em R$"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="sale_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor de Venda (Opcional)</FormLabel>
                          <Input
                            placeholder="Valor de venda em R$"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> 
                </div>
                <div className="pt-7">
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black"
                  >
                    Adicionar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}