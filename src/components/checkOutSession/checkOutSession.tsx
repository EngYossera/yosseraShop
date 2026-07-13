
import { checkOutAction } from "@/actions/addToCart.action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShippingAddress } from "@/inrerfaces/CartInterfaces"
import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import { set } from "zod"

export default function CheckOutSession({cartId}:{cartId:string}){
    const [isLoading,setLoading] =useState(false);
    const city=useRef<null | HTMLInputElement>(null);
    const details=useRef<null | HTMLInputElement>(null);
    const phone=useRef<null | HTMLInputElement>(null);
  async  function checkOut(){
    setLoading(true);
            const shippingAddress:ShippingAddress={
                city:city.current?.value as string,
                details:details.current?.value as string,
                phone:phone.current?.value as string
            }
            const response= await checkOutAction(cartId,shippingAddress);
            console.log(response);
            if(response.status=='success'){
              location.href=response.session.url;
            }
            setLoading(false);
       
    }


    return <>


    <Dialog>
 
        <DialogTrigger  asChild>
     <Button className="w-full mt-2 py-4">Check Out</Button>
              </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
             please add your shipping address
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city">city</Label>
              <Input ref={city} id="city" name="city" defaultValue="Jeddah" />
            </Field>
            <Field>
              <Label htmlFor="details">Details</Label>
              <Input ref={details} id="details" name="details" defaultValue="naseem" />
            </Field>

              <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phone} id="phone" name="phone" defaultValue="0504409326" />
            </Field>
           
          </FieldGroup>
          <DialogFooter>
            <DialogClose  asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
            <Button onClick={checkOut} type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Save changes</Button>
          </DialogFooter>
        </DialogContent>
   
    </Dialog>
     
    </>
}