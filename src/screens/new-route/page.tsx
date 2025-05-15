import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { DirectionsData } from "../../utils/models";
import Header from "@/components/Header";
import { MapNewRoute } from "./MapNewRoute";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import NewRouteService from "./service";

const FormSchema = z.object({
  start_location: z.string({required_error: "Informe a localização de partida"}),
  end_location: z.string({required_error: "Informe a localização de chegada"}),
})

export function CreateNewRoute() {
  const navigate = useNavigate()
  const [directionsData, setDirectionsData] = useState<DirectionsData | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        start_location: '',
        end_location: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await NewRouteService.createRoute({data})
      if (response) {
        console.log("Rota criada com sucesso");
        navigate('/')
      } else {
        console.log("Erro ao criar rota");
      }
    } catch (error) {
      console.log("Erro ao criar rota:", error);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const mockEndLocation = {
          lat: latitude + 0.01, // só para exemplo, desloca um pouco do ponto inicial
          lng: longitude + 0.01,
        };

        const data: DirectionsData = {
          routes: [
            {
              legs: [
                {
                  start_location: { lat: latitude, lng: longitude },
                  end_location: mockEndLocation,
                },
              ],
            },
          ],
        };

        setDirectionsData(data);
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
      }
    );
    }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col h-screen"> 
        <div className="flex flex-1"> 
          <div className="w-1/3 p-4 overflow-auto"> 
            <h1 className="text-3xl text-contrast mb-2">Nova rota</h1>

            <div className="mt-4 p-4 border rounded text-contrast bg-blue-800 text-white">              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='mr-8'>
                    <FormField
                      control={form.control}
                      name='start_location'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partida</FormLabel>
                          <Input placeholder='Localização de partida' {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='mr-8'>
                    <FormField
                      control={form.control}
                      name='end_location'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destino</FormLabel>
                          <Input placeholder='Localização de chegada' {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="font-bold p-2 rounded mt-4"
                  >
                    Adicionar rota
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <MapNewRoute directionsData={directionsData} />
          
        </div>
      </div>
    </>
  );
}
