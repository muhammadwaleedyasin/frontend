import React from 'react'
import Section from '../shared/Section'

const RentedProperties = () => {
    return (
        <div className="bg-white rounded-lg py-3  h-screen">
            <Section>
                <div className="">
                    <div className="max-w-6xl mx-auto py-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Happening Today!</h2>
                            <table className="w-full  border-collapse">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="border border-black px-4 py-2 text-left">id</th>
                                        <th className="border border-black px-4 py-2 text-left">Property name</th>
                                        <th className="border border-black px-4 py-2 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Add your data rows here */}
                                    <tr>
                                        <td className="border border-black px-4 py-2"></td>
                                        <td className="border border-black px-4 py-2"></td>
                                        <td className="border border-black px-4 py-2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Booked properties</h2>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="border border-black px-4 py-2 text-left">id</th>
                                        <th className="border border-black px-4 py-2 text-left">Property name</th>
                                        <th className="border border-black px-4 py-2 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Add your data rows here */}
                                    <tr>
                                        <td className="border border-black px-4 py-2"></td>
                                        <td className="border border-black px-4 py-2"></td>
                                        <td className="border border-black px-4 py-2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default RentedProperties