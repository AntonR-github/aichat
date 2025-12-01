"use client"

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import Link from "next/link";


function AddNewSessionDialog() {
    const [note, setNote] = useState<string>()
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='mt-3'>+ Start a Consultation</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <h2>Add Symptoms or Any Other Details</h2>
                                <Textarea onChange={(e) => setNote(e.target.value)}>

                                </Textarea>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div> */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Link href="/dashboard/medical-agent">
                            <Button disabled={!note}>
                                Start a chat
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddNewSessionDialog