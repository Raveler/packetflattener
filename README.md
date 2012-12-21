packetflattener
===============

This code will flatten a complex object hierarchy to a single array, based on a template. This is useful for when you need a very high compression ratio on javascript data that needs to be sent over the internet, for example through Websockets. A detailed description can be found on:

http://www.castlequest.be/silenistudios/?p=212

# Example

    // template
    var template = {
      field1: 0,
        field2: [{
            field21: 0,
            field22: 0,
            field23: {
                field231: 0,
                field232: 0
            }
        }],
        field3: 0
    };

    // data
    var data = {
        field1: 1.0,
        field2: new Array(
            {
                field21: 2.1,
                field22: 2.2,
                field23: {
                    field231: 2.31,
                    field232: 2.32
                }
            },
            {
                field21: 2.1,
                field22: 2.2,
                field23: {
                    field231: 2.31,
                    field232: 2.32
                }
            }
        ),
        field3: 3.0
    };

    // flatten
    var array = PacketFlattener.flatten(data, template);

    // array is now [1, 2, 2.1, 2.2, 2.31, 2.32, 2.1, 2.2, 2.31, 2.32, 3] 

    // unflatten again
    var originalData = PacketFlattener.unflatten(array, template);

    // originalData == data
